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
	"github.com/AleF83/RPGM/services/backend/controllers"
)

func main() {
	config := appConfig.LoadConfiguration()
	agents.InitRedis(&config.Connections.Redis)
	agents.InitMinio(&config.Connections.Minio)
	agents.InitSolr(&config.Connections.Solr)

	app := chi.NewRouter()

	app.Use(middleware.Logger)
	app.Use(middleware.Recoverer)

	app.HandleFunc("/api/health", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "I'm healthy") })

	entityController := controllers.NewEntityController()
	app.Mount("/api/entity", entityController)

	err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), app)

	log.Fatal(err)
}
