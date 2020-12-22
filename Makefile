dev:
	rm -rf ./gh-pages
	antora site.yaml

netlify-head:
	rm -rf ./gh-pages
	npm install --global @antora/cli@2.3 @antora/site-generator-default@2.3
	antora site.yaml
