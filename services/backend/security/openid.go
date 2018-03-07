package security

// import (
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// 	"strings"
// )

// const wellKnownSuffix = "/.well-known/openid-configuration"

// type providerJSON struct {
// 	Issuer      string `json:"issuer"`
// 	AuthURL     string `json:"authorization_endpoint"`
// 	TokenURL    string `json:"token_endpoint"`
// 	JWKSURL     string `json:"jwks_uri"`
// 	UserInfoURL string `json:"userinfo_endpoint"`
// }

// type Provider struct {
// 	issuer      string
// 	authURL     string
// 	tokenURL    string
// 	userInfoURL string

// 	// Raw claims returned by the server.
// 	rawClaims []byte

// 	// remoteKeySet KeySet
// }

// // DiscoverOpenidConnect returns openid connect configuration
// func DiscoverOpenidConnect(issuer string) (interface{}, error) {
// 	discoveryURL := fmt.Sprintf("%s%s", strings.TrimSuffix(issuer, "/"), wellKnownSuffix)
// 	httpClient := http.DefaultClient
// 	resp, err := httpClient.Get(discoveryURL)
// 	if err != nil {
// 		return nil, err
// 	}
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer resp.Body.Close()

// 	body, err := ioutil.ReadAll(resp.Body)
// 	if err != nil {
// 		return nil, fmt.Errorf("Response body read failed: %v", err)
// 	}

// 	if resp.StatusCode != http.StatusOK {
// 		return nil, fmt.Errorf("%s: %s", resp.Status, body)
// 	}

// 	var p providerJSON
// 	err = json.Unmarshal(body, &p)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if p.Issuer != issuer {
// 		return nil, fmt.Errorf("oidc: issuer did not match the issuer returned by provider, expected %q got %q", issuer, p.Issuer)
// 	}

// 	return &Provider{
// 		issuer:       p.Issuer,
// 		authURL:      p.AuthURL,
// 		tokenURL:     p.TokenURL,
// 		userInfoURL:  p.UserInfoURL,
// 		rawClaims:    body,
// 		remoteKeySet: NewRemoteKeySet(ctx, p.JWKSURL),
// 	}, nil

// }
