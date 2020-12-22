dev:
	rm -rf ./gh-pages
	antora site.yaml

netlify-head:
	rm -rf ./gh-pages
	npm install -g antora-cli@2.3.4
	antora site.yaml
