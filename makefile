
install: install-api

test: test-api

run: run-api

install-api:
	@echo "Installing Node dependencies"
	cd api && yarn

run-api:
	cd api && node index.js

test-api:
	cd api && npm test
