.PHONY: install test run

PGUSER ?= postgres
PGHOST ?= 127.0.0.1

install: install-npm install-dockers create-database-for-dev

test:
	@$(MAKE) drop-database-for-test
	@$(MAKE) create-database-for-test
	@$(MAKE) test-api
	@$(MAKE) test-frontend

codeclimate:
	@$(MAKE) codeclimate-api
	@$(MAKE) codeclimate-frontend

run:
	@./node_modules/.bin/concurrently "cd api && yarn start" "cd frontend && yarn start"

install-dockers:
	@if which docker > /dev/null; then\
		@echo "Installing Docker images";\
		docker-compose up -d;\
		docker pull codeclimate/codeclimate;\
	fi

install-npm:
	@echo 'Installing NPM'
	curl -o- -L https://yarnpkg.com/install.sh | bash
	yarn
	cd api && yarn
	cd frontend && yarn

npm-check:
	@echo 'Check NPM for API'
	@cd api && ./node_modules/.bin/npm-check -u
	@echo 'Check NPM for Frontend'
	@cd frontend && ./node_modules/.bin/npm-check -u

bump-version-npm:
	@echo 'Bump version NPM packages'
	yarn
	cd api && yarn upgrade
	cd frontend && yarn upgrade

create-database-for-dev:
	@echo "Create database dev"
	@createdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_dev || true

drop-database-for-dev:
	@echo "Drop database dev"
	@dropdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_dev || true

create-database-for-test:
	@echo "Create database test"
	@createdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_test || true

drop-database-for-test:
	@echo "Drop database test"
	@dropdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_test || true

generate-model:
	@echo 'Creating the $(MODEL) model'
	@./api/node_modules/.bin/sequelize model:create --name $(MODEL) \
		--attributes foo:string  --models-path ./api/app/models/ \
		--migrations-path ./api/db/migrations/

migrate:
	@echo 'Running Migrations'
	@./api/node_modules/.bin/sequelize db:migrate \
		--models-path ./api/app/models/ \
		--migrations-path ./api/db/migrations/ \
		--config ./api/config/database.json

test-api:
	@echo 'Start API Tests'
	cd api && yarn test

test-frontend:
	@echo 'Start Frontend Tests'
	cd frontend && yarn test

test-frontend-functional: build-frontend-test

test-e2e:
	NODE_ENV=test @$(MAKE) build

build-frontend-test:
	cd frontend && ./node_modules/.bin/webpack ./webpack/webpack.config.babel.js

codeclimate-api:
	@echo 'Codeclimate API'
	docker run \
		-ti --rm \
  	--env CODECLIMATE_CODE=$(PWD)/api/ \
  	-v $(PWD)/api/:/code \
  	-v /var/run/docker.sock:/var/run/docker.sock \
  	-v /tmp/cc:/tmp/cc \
  	codeclimate/codeclimate analyze

codeclimate-frontend:
	@echo 'Codeclimate Frontend'
	docker run \
		-ti --rm \
  	--env CODECLIMATE_CODE=$(PWD)/frontend/ \
  	-v $(PWD)/frontend/:/code \
  	-v /var/run/docker.sock:/var/run/docker.sock \
  	-v /tmp/cc:/tmp/cc \
  	codeclimate/codeclimate analyze

build-frontend:
	@rm -rf ./frontend/public/assets/* || true
	@cd frontend && ./node_modules/.bin/webpack --progress -p -d

clean:
	@echo 'Delete node_modules directory'
	rm -rf node_modules
	rm -rf api/node_modules
	rm -rf frontend/node_modules
