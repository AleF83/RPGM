restore:
	dep ensure

build:
	CGO_ENABLED=0 go build -a -installsuffix cgo -o server

start:
	CONFIGOR_ENV=local CONFIG_FILE_PATH=./config/config.json ./server

build_image:
	docker build -t alef83/rpgm-backend .,
start_image: 
	docker run --rm -d -p 8080:80 --name rpgm-backend rpgm-backend,
stop_image: 
	docker stop rpgm-backend,
inspect_image: 
	docker inspect rpgm-backend --format {{.State.Health.Status}}