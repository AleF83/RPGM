package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/AleF83/RPGM/services/backend/agents"
	"github.com/AleF83/RPGM/services/backend/appConfig"
)

func main() {
	config := appConfig.LoadConfiguration()
	log.Printf("CONFIG: %#v", config)
	agents.InitMinio(&config.Connections.Minio)

	app := chi.NewRouter()

	app.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "Hello, World!") })
	app.HandleFunc("/health", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "I'm healthy") })

	app.Use(middleware.Logger)
	app.Use(middleware.Recoverer)

	err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), app)

	log.Fatal(err)
}
