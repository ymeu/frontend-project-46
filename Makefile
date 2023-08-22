publish:
	npm publish --dry-run

gendiff:
	node cli.js

lint:
	npx eslint .

test:
	npm test

watch: 
	npx jest --watch

test-coverage:
	npx jest --coverage