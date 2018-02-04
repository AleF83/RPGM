package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"

	"github.com/AleF83/RPGM/services/backend/appConfig"
	"github.com/AleF83/RPGM/services/backend/controllers"
)

func main() {
	_, err := appConfig.LoadConfiguration()
	if err != nil {
		log.Fatalln("Failed to load configuration:", err)
	}

	rootRouter := chi.NewRouter()

	rootRouter.Use(middleware.Logger)
	rootRouter.Use(middleware.Recoverer)

	rootRouter.HandleFunc("/health", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "I'm healthy") })

	entityController := controllers.NewEntityController()
	rootRouter.Mount("/api/entity", entityController)

	app := cors.AllowAll().Handler(rootRouter)

	err = http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), app)

	log.Fatal(err)
}
