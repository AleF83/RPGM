package security

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/AleF83/RPGM/services/backend/appConfig"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/lestrrat/go-jwx/jwk"
)

// NewAuthenticationMiddleware - create authentication middleware that verifies JWT
func NewAuthenticationMiddleware(providers map[string]appConfig.AuthProvider) func(http.Handler) http.Handler {
	keyFunc := func(t *jwt.Token) (interface{}, error) {
		claims := t.Claims.(jwt.MapClaims)
		if issuer, ok := claims["iss"].(string); ok {
			if provider, exists := providers[issuer]; exists {
				if keyID, keyExists := t.Header["kid"].(string); keyExists {
					key, err := getKeyByProvider(&provider, keyID)
					if err != nil {
						return nil, err
					}
					return key, nil
				}
				return nil, errors.New("kid field not found in JWT header")

			}
			return nil, errors.New("Issuer field not found in JWT claims")

		}
		return nil, errors.New("Issuer not found in JWT claims")
	}

	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			token, err := request.ParseFromRequest(r, request.OAuth2Extractor, keyFunc)
			if err != nil {
				http.Error(w, fmt.Sprintf("Authentication Error: %v", err), http.StatusUnauthorized)
				return
			}
			newRequest := createRequestWithContext(r, token)
			next.ServeHTTP(w, newRequest)
		}
		return http.HandlerFunc(fn)
	}
}

func getKeyByProvider(provider *appConfig.AuthProvider, keyID string) (interface{}, error) {
	keySet, err := jwk.FetchHTTP(provider.JWKsURL)
	if err != nil {
		return nil, err
	}
	keys := keySet.LookupKeyID(keyID)
	if len(keys) == 0 {
		return nil, errors.New("No keys found")
	}
	if len(keys) > 1 {
		return nil, errors.New("More then one key found")
	}
	return keys[0].Materialize()
}

type contextKey string

func createRequestWithContext(r *http.Request, t *jwt.Token) *http.Request {
	userInfo := map[string]string{}

	return r.WithContext(context.WithValue(r.Context(), contextKey("user"), userInfo))
}
