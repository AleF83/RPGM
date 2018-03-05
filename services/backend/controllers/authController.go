package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/AleF83/RPGM/services/backend/appConfig"
	"github.com/go-chi/chi"
)

// NewAuthRouter creates AuthController
func NewAuthRouter(authProviders map[string]appConfig.AuthProvider) http.Handler {
	authRouter := chi.NewRouter()
	authRouter.Get("/providers", getAuthProviders(authProviders))
	return authRouter
}

func getAuthProviders(authProviders map[string]appConfig.AuthProvider) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		js, err := json.Marshal(authProviders)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	}

}
