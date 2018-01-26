package appConfig

import "github.com/jinzhu/configor"

// Minio stores connection config to minio
type Minio struct {
	Endpoint      string
	AccessKey     string
	AccessKeyPath string
	SecretKey     string
	SecretKeyPath string
	UseSSL        bool
	BucketName    string
}

// Solr stores connection config to solr
type Solr struct {
	Host           string
	Port           string
	CollectionName string
}

// Connections stores connection configuration to services
type Connections struct {
	Minio Minio
	Solr  Solr
}

// Configuration stores all app configuration
type Configuration struct {
	Connections Connections
}

// LoadConfiguration loads configuration from config files and env variables
func LoadConfiguration() *Configuration {
	config := &Configuration{}
	configManager := configor.New(&configor.Config{ENVPrefix: "RPGM"})
	configManager.Load(config)

	return config
}
