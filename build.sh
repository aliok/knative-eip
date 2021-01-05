#!/usr/bin/env bash

# copy everything under .build directory
rm -rf .build
mkdir .build
cp -r !(.build) .build

node hack/pushImages.js --glob="main/modules/**/*.yaml" --prefix="img" --dockerFile="hack/Dockerfile"  > .build/resolvedImages.properties
# check pushImages failed

# merge env.properties and resolvedImages.properties
merge env.properties .build/.resolvedImages.properties

node hack/replaceTemplate.js .build

antora .build/site.yaml
