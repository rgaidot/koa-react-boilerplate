
install: install-api

test: test-api

run: run-api

install-api:
	@echo 'Installing NPM'
	cd api && yarn
	cd frontend && yarn

run-api:
	cd api && node index.js

test-api:
	cd api && npm test

clean:
	@echo 'Delete node_modules directory'
	rm -rf api/node_modules
	rm -rf frontend/node_modules
