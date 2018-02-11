package appConfig

import "github.com/jinzhu/configor"

// Configuration stores all app configuration
type Configuration struct {
}

// LoadConfiguration loads configuration from config files and env variables
func LoadConfiguration() (*Configuration, error) {
	config := &Configuration{}
	configManager := configor.New(&configor.Config{ENVPrefix: "RPGM"})
	if err := configManager.Load(config); err != nil {
		return nil, err
	}

	return config, nil
}
