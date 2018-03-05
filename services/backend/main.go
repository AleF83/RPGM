package main

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/jwtauth"
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

	rootRouter.Group(func(r chi.Router) {
		// Seek, verify and validate JWT tokens
		//r.Use(jwtauth.Verifier(tokenAuth))

		// Handle valid / invalid tokens. In this example, we use
		// the provided authenticator middleware, but you can write your
		// own very easily, look at the Authenticator method in jwtauth.go
		// and tweak it, its not scary.
		r.Use(jwtauth.Authenticator)

		proxyController := controllers.NewProxyController(config)
		r.Mount("/api/*", proxyController)

	})

	rootRouter.Group(func(r chi.Router) {
		authRouter := controllers.NewAuthRouter(config.Security.Auth.Providers)
		r.Mount("/auth/*", authRouter)
	})

	app := cors.AllowAll().Handler(rootRouter)

	err = http.ListenAndServe(fmt.Sprintf(":%s", config.Port), app)

	log.Fatal(err)
}
