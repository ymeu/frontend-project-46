publish:
	npm publish --dry-run

gendiff:
	node cli.js

lint:
	npx eslint .

install: install-deps
	npx simple-git-hooks

test:
	npm test