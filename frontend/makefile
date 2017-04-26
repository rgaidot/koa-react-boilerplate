.PHONY: install test run

install: install-npm

test:
	@echo "Frontend - Tests"
	yarn test

codeclimate:
	@echo 'Frontend - Codeclimate'
	docker run \
		-ti --rm \
  	--env CODECLIMATE_CODE=$(PWD)/frontend/ \
  	-v $(PWD)/:/code \
  	-v /var/run/docker.sock:/var/run/docker.sock \
  	-v /tmp/cc:/tmp/cc \
  	codeclimate/codeclimate analyze

install-npm:
	@echo 'Frontend - Installing NPM dependencies for $(NODE_ENV)'
	@curl -o- -L https://yarnpkg.com/install.sh | bash
	@yarn config set version-git-message "v%s"
	yarn $(if $(filter production staging,$(NODE_ENV)),--production,) --pure-lockfile

npm-check:
	@echo 'Frontend - Check NPM'
	@./node_modules/.bin/npm-check -u

bump-version-npm:
	@echo 'Frontend - Bump version NPM packages'
	yarn upgrade

build-frontend:
	@echo 'Frontend - Build'
	@rm -rf ./public/assets/* || true
	@./node_modules/.bin/webpack --progress -p -d

release: release-frontend
	@echo 'Frontend - Release'
	yarn release

clean:
	@echo 'Frontend - Delete node_modules directory'
	@rm -r ./node_modules

prettier:
	@echo 'Start prettier Frontend'
	@./node_modules/.bin/prettier --write --single-quote \
		--trailing-comma all --jsx-bracket-same-line all --print-width 80 \
		--tab-width 4 --color --bracket-spacing true  ./src/**/*.js
