.PHONY: install test run

PGUSER ?= postgres
PGHOST ?= 127.0.0.1

install: install-npm create-database-for-dev

test:
	@echo "API - Tests"
	@$(MAKE) drop-database-for-test
	@$(MAKE) create-database-for-test
	@NODE_ENV=test $(MAKE) migrate
	@NODE_ENV=test $(MAKE) db-seeds
	@NODE_ENV=test yarn test

codeclimate:
	@echo 'API - Codeclimate'
	docker run \
		-ti --rm \
  	--env CODECLIMATE_CODE=$(PWD)/api/ \
  	-v $(PWD)/:/code \
  	-v /var/run/docker.sock:/var/run/docker.sock \
  	-v /tmp/cc:/tmp/cc \
  	codeclimate/codeclimate analyze

install-npm:
	@echo 'API - Installing NPM dependencies $(NODE_ENV)'
	@curl -o- -L https://yarnpkg.com/install.sh | bash
	@yarn config set version-git-message "v%s"
	yarn  $(if $(filter production staging,$(NODE_ENV)),--production,) --pure-lockfile

npm-check:
	@echo 'API - Check NPM'
	.@/node_modules/.bin/npm-check -u

bump-version-npm:
	@echo 'API - Bump version NPM packages'
	yarn upgrade

create-database-for-dev:
	@echo "API - Create database dev"
	@createdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_dev || true

drop-database-for-dev:
	@echo "API - Drop database dev"
	@dropdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_dev || true

create-database-for-test:
	@echo "API - Create database test"
	@createdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_test || true

drop-database-for-test:
	@echo "API - Drop database test"
	@dropdb --user=${PGUSER} --host=${PGHOST} koa-restfull-db_test || true

generate-model:
	@echo 'API - Creating the $(MODEL) model'
	@./node_modules/.bin/sequelize model:create --name $(MODEL) \
		--attributes foo:string  --models-path ./src/models/ \
		--migrations-path ./db/migrations/

generate-seeder:
	@echo 'API - Creating the $(MODEL) seeder'
	@./node_modules/.bin/sequelize seed:create --name $(MODEL) \
		--seeders-path ./db/seeders/ \
		--config ./config/database.json

migrate:
	@echo 'API - Running Migrations'
	@./node_modules/.bin/sequelize --harmony_modules db:migrate \
		--models-path ./src/models/ \
		--migrations-path ./db/migrations/ \
		--config ./config/database.json \

db-seeds: db-seeds-down db-seeds-up
	@echo 'Running seeds'

db-seeds-down:
	@./node_modules/.bin/sequelize db:seed:undo:all  \
	--seeders-path ./db/seeders/ \
	--config ./config/database.json

db-seeds-up:
	@./node_modules/.bin/sequelize db:seed:all \
	--seeders-path ./db/seeders/ \
	--config ./config/database.json

release: release-api
	@echo 'API - Release API'
	yarn release

clean:
	@echo 'API - Delete node_modules directory'
	@rm -rf ./node_modules

prettier:
	@echo 'Start prettier API'
	@./node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./config/**/*.js
	@./node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./common/**/*.js
	@./node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./src/**/*.js
	@./node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./lib/**/*.js

generate-doc:
	@rm -rf ./doc
	@./node_modules/.bin/apidoc -i ./src/controllers/  -o ./doc
