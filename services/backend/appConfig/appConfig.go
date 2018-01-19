package appConfig

import (
	"os"

	"github.com/jinzhu/configor"
)

// AuthProvider - struct for store OpenId connect provider configuration
type AuthProvider struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Authority string `json:"authority"`
	Scope     string `json:"scope"`
}

// Auth stores configuration about OpenId Connect Providers and etc.
type Auth struct {
	Providers []AuthProvider
}

// Security - stores security configuration
type Security struct {
	Auth Auth
}

// Configuration stores all app configuration
type Configuration struct {
	CoreAPIURL string
	Port       string
	Security   Security
}

// LoadConfiguration loads configuration from config files and env variables
func LoadConfiguration() (*Configuration, error) {
	config := &Configuration{}
	configManager := configor.New(&configor.Config{ENVPrefix: "RPGM"})

	if configPath, exists := os.LookupEnv("CONFIG_FILE_PATH"); exists {
		if err := configManager.Load(config, configPath); err != nil {
			return nil, err
		}
	} else {
		if err := configManager.Load(config); err != nil {
			return nil, err
		}
	}
	return config, nil
}
