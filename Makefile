build:
	docker-compose build

start:
	docker-compose up

stop:
	docker-compose stop

kill: stop
	docker-compose rm