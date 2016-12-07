.PHONY: install test run

install: install-api

test: test-api test-frontend

run: run-api run-frontend

install-api:
	@echo 'Installing NPM'
	cd api && yarn
	cd frontend && yarn

run-api:
	@echo 'Start API'
	cd api && node index.js

run-frontend:
	@echo 'Start Frontend'
	cd frontend && ./node_modules/.bin/webpack-dev-server

test-api:
	@echo 'Start API Tests'
	cd api && npm test
	@./node_modules/jsinspect/bin/jsinspect

test-frontend:
	@echo 'Start Frontend Tests'	
	cd frontend && npm test
	@./node_modules/jsinspect/bin/jsinspect

clean:
	@echo 'Delete node_modules directory'
	rm -rf api/node_modules
	rm -rf frontend/node_modules
