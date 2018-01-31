package agents

import (
	"log"
	"strconv"

	"github.com/AleF83/RPGM/services/backend/appConfig"
	"github.com/rtt/Go-Solr"
)

// SolrAgent contains all functionality for store and retrieve data from solr
type SolrAgent interface {
}

type solrAgentStruct struct {
	client *solr.Connection
}

// InitSolr initializes client to Solr
func InitSolr(config *appConfig.Solr) SolrAgent {
	port, err := strconv.Atoi(config.Port)
	if err != nil {
		log.Panicln("Solr port configuration value must be an integer", err)
	}

	con, err := solr.Init(config.Host, port, config.CollectionName)
	if err != nil {
		log.Panicln("Solr connection creation failed:", err)
	}

	return &solrAgentStruct{
		client: con,
	}
}
