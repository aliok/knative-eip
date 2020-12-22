dev:
	./build.sh

netlify-head:
	npm install --global @antora/cli@2.3 @antora/site-generator-default@2.3
	./build.sh
