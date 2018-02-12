package appConfig

import (
	"os"

	"github.com/jinzhu/configor"
)

// Configuration stores all app configuration
type Configuration struct {
	CoreAPIURL string
	Port       string
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
