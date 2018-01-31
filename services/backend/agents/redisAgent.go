package agents

import (
	"github.com/AleF83/RPGM/services/backend/appConfig"
	"github.com/garyburd/redigo/redis"
)

// RedisAgent contains all functionality for store and retrieve data from redis
type RedisAgent interface {
}

type redisAgentStruct struct {
	pool *redis.Pool
}

// InitRedis inits redis agent
func InitRedis(config *appConfig.Redis) RedisAgent {
	redisPool := &redis.Pool{
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", config.Endpoint)

			if err != nil {
				return nil, err
			}

			return c, err
		},
	}

	agent := &redisAgentStruct{
		pool: redisPool,
	}

	return agent
}
