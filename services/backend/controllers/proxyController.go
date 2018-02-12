package controllers

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/AleF83/RPGM/services/backend/appConfig"
)

// NewProxyController creates new Reverse Proxy Controller
func NewProxyController(config *appConfig.Configuration) http.Handler {
	proxyURL, err := url.Parse(config.CoreAPIURL)
	if err != nil {
		log.Panicln("Error creating proxy:", err)
	}

	proxy := httputil.NewSingleHostReverseProxy(proxyURL)
	return proxy
}
