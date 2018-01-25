package agents

import (
	"io/ioutil"
	"log"

	"github.com/AleF83/RPGM/services/backend/appConfig"
	"github.com/minio/minio-go"
)

type minioAgentStruct struct {
	client *minio.Client
}

// MinioAgent contains all functionality for store and retrieve data from minio
type MinioAgent interface {
}

// InitMinio creates minio client
func InitMinio(config *appConfig.Minio) MinioAgent {
	initAccessKey(config)
	initSecretKey(config)

	client, err := minio.New(config.Endpoint, config.AccessKey, config.SecretKey, config.UseSSL)
	if err != nil {
		log.Panicln("Error creating minio client:", err)
	}

	exists, err := client.BucketExists(config.BucketName)
	if err != nil {
		log.Panicln("Error checking minio bucket", err)
	}
	if !exists {
		log.Panicln("Minio bucket doesn't exist")
	}

	return &minioAgentStruct{
		client: client,
	}
}

func initAccessKey(config *appConfig.Minio) {
	if len(config.AccessKey) == 0 {
		if len(config.AccessKeyPath) > 0 {
			buff, err := ioutil.ReadFile(config.AccessKeyPath)
			if err != nil {
				log.Panicln("Minio access key file read failed", err)
			}
			config.AccessKey = string(buff)
		} else {
			log.Panicln("Minio access key not set either in AccessKey env variable or AccessKeyPath one")
		}
	}
}

func initSecretKey(config *appConfig.Minio) {
	if len(config.SecretKey) == 0 {
		if len(config.SecretKeyPath) > 0 {
			buff, err := ioutil.ReadFile(config.SecretKeyPath)
			if err != nil {
				log.Panicln("Minio secret key file read failed", err)
			}
			config.SecretKey = string(buff)
		} else {
			log.Panicln("Minio secret key not set either in SecretKey env variable or SecretKeyPath one")
		}
	}
}
