publish:
	npm publish --dry-run

gendiff:
	node cli.js

lint:
	npx eslint .