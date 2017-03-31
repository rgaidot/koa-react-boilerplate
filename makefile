.PHONY: install test run

PGUSER ?= postgres
PGHOST ?= 127.0.0.1

install: install-npm install-dockers create-database-for-dev

test:
	@$(MAKE) drop-database-for-test
	@$(MAKE) create-database-for-test
	@$(MAKE) migrate
	@$(MAKE) load-seeds
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
	@curl -o- -L https://yarnpkg.com/install.sh | bash
	@yarn
	@yarn config set version-git-message "v%s"
	cd api && yarn --pure-lockfile
	cd frontend && yarn --pure-lockfile

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
		--attributes foo:string  --models-path ./api/src/models/ \
		--migrations-path ./api/db/migrations/

generate-seeder:
	@echo 'Creating the $(MODEL) seeder'
	@./api/node_modules/.bin/sequelize seed:create --name $(MODEL) \
		--seeders-path ./api/db/seeders/ \
		--config ./api/config/database.json

migrate:
	@echo 'Running Migrations'
	@./api/node_modules/.bin/sequelize --harmony_modules db:migrate \
		--models-path ./api/src/models/ \
		--migrations-path ./api/db/migrations/ \
		--config ./api/config/database.json \

load-seeds:
	@echo 'Running seeds'
	@./api/node_modules/.bin/sequelize db:seed:all \
		--seeders-path ./api/db/seeders/ \
		--config ./api/config/database.json

test-api:
	@echo 'Start API Tests'
	cd api && yarn test

test-frontend:
	@echo 'Start Frontend Tests'
	cd frontend && yarn test

test-e2e:
	@$(MAKE) build-frontend

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

release: release-api release-frontend

release-api:
	@echo 'Release API'
	@cd api && yarn release

release-frontend:
	@echo 'Release frontend'
	@cd frontend && yarn release

clean:
	@echo 'Delete node_modules directory'
	rm -rf node_modules
	rm -rf api/node_modules
	rm -rf frontend/node_modules
