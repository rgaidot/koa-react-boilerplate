.PHONY: install test run

PGUSER ?= postgres
PGHOST ?= 127.0.0.1

install: install-npm install-dockers

test: test-api test-frontend

test-api:
	@$(MAKE) -C api test

test-frontend:
	@$(MAKE) -C frontend test

codeclimate:
	@$(MAKE) -C api codeclimate
	@$(MAKE) -C frontend codeclimate

run:
	@./node_modules/.bin/concurrently "cd api && yarn start" "cd frontend && yarn start"

install-dockers:
	@if which docker > /dev/null; then\
		@echo "Installing Docker images";\
		docker-compose up -d;\
		docker pull codeclimate/codeclimate;\
	fi

install-npm:
	@curl -o- -L https://yarnpkg.com/install.sh | bash
	@yarn
	@yarn config set version-git-message "v%s"
	@$(MAKE) -C api install-npm
	@$(MAKE) -C frontend install-npm

npm-check:
	@$(MAKE) -C api npm-check
	@$(MAKE) -C frontend npm-check

bump-version-npm:
	@$(MAKE) -C api npm-check
	@$(MAKE) -C frontend npm-check

create-database-for-dev:
	@$(MAKE) -C api create-database-for-dev

drop-database-for-dev:
	@$(MAKE) -C api drop-database-for-dev

create-database-for-test:
	@$(MAKE) -C api create-database-for-test

drop-database-for-test:
	@$(MAKE) -C api drop-database-for-test

generate-model:
	@$(MAKE) -C api generate-model

generate-seeder:
	@$(MAKE) -C api generate-seeder

migrate:
	@$(MAKE) -C api migrate

load-seeds:
	@$(MAKE) -C api load-seeds

codeclimate-api:
	@$(MAKE) -C api codeclimate-api

codeclimate-frontend:
	@$(MAKE) -C frontend codeclimate-frontend

build-frontend:
	@$(MAKE) -C frontend build-frontend

release:
	@$(MAKE) -C api release
	@$(MAKE) -C frontend release-frontend

release-api:
	@$(MAKE) -C api release-api

release-frontend:
	@$(MAKE) -C frontend release-frontend

clean:
	@rm -r ./node_modules
	@$(MAKE) -C frontend clean
	@$(MAKE) -C api clean

prettier: prettier-api prettier-frontend

prettier-frontend:
	@echo 'Start prettier Frontend'
	@./frontend/node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --jsx-bracket-same-line all --print-width 80 \
		--tab-width 4 --color --bracket-spacing true  ./frontend/src/**/*.js

prettier-api:
	@echo 'Start prettier API'
	@./api/node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./api/config/**/*.js
	@./api/node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./api/common/**/*.js
	@./api/node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./api/src/**/*.js
	@./api/node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --print-width 80 --tab-width 4 --color \
		--bracket-spacing true  ./api/lib/**/*.js
