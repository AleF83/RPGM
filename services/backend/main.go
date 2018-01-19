package main

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"

	"github.com/AleF83/RPGM/services/backend/appConfig"
	"github.com/AleF83/RPGM/services/backend/controllers"
)

func main() {
	log.Println("Starting server...")

	config, err := appConfig.LoadConfiguration()
	if err != nil {
		log.Fatalln("Failed to load configuration:", err)
	}
	log.Printf("Configuration: %#v", config)
	log.Println("Configuration loaded.")

	rootRouter := chi.NewRouter()

	rootRouter.Use(middleware.Logger)
	rootRouter.Use(middleware.Recoverer)

	rootRouter.HandleFunc("/health", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "I'm healthy") })

	proxyController := controllers.NewProxyController(config)
	rootRouter.Mount("/api/*", proxyController)

	authRouter := controllers.NewAuthRouter(config.Security.Auth.Providers)
	rootRouter.Mount("/auth/*", authRouter)

	app := cors.AllowAll().Handler(rootRouter)

	err = http.ListenAndServe(fmt.Sprintf(":%s", config.Port), app)

	log.Fatal(err)
}
