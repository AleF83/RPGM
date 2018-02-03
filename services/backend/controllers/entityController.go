package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"
)

// NewEntityController creates new Entity Controller
func NewEntityController() http.Handler {
	router := chi.NewRouter()
	router.Get("/{entityId}", getEntityHandler)
	router.Post("/", createNewEntityHandler)
	router.Put("/{entityId}", replaceEntityHandler)
	router.Patch("/{entityId}", updateEntityHandler)
	router.Delete("/{entityId}", deleteEntityHandler)
	return router
}

func getEntityHandler(rw http.ResponseWriter, r *http.Request) {
	rw.Write([]byte("This is the entity"))
}

func createNewEntityHandler(rw http.ResponseWriter, r *http.Request) {
	message := "The entity was created"
	js, err := json.Marshal(message)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(js)
}

func replaceEntityHandler(rw http.ResponseWriter, r *http.Request) {
	rw.Write([]byte("The entity was replaced"))
}

func updateEntityHandler(rw http.ResponseWriter, r *http.Request) {
	rw.Write([]byte("The entity was updated"))
}

func deleteEntityHandler(rw http.ResponseWriter, r *http.Request) {
	rw.Write([]byte("The entity was deleted"))
}
