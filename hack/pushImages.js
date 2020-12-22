#!/usr/bin/env node

// TODO: remove
process.on('uncaughtException', function (err) {
    console.error("Uncaught exception:")
    console.error(err);
    process.exit(-1);
});

const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const YAML = require('yaml');
const {readFileSync} = require('fs');
const {basename} = require('path');

const argv = yargs(hideBin(process.argv)).argv

let verbose = argv['verbose'] === "true" || argv['verbose'] === true;

if (!argv['glob']) {
    console.error("glob is not defined");
    process.exit(-1);
} else if (verbose) {
    console.log("Going to use glob: " + argv['glob']);
}

if (!argv['prefix']) {
    argv['prefix'] = "img";
    console.log("Going to use the default prefix: " + argv['prefix']);
} else if (verbose) {
    console.log("Going to use prefix: " + argv['prefix']);
}

if (!argv['baseDir']) {
    console.error("baseDir is not defined");
    process.exit(-1);
} else if (verbose) {
    console.log("Going to use baseDir: " + argv['baseDir']);
}

const koDockerRepo = process.env['KO_DOCKER_REPO'];
if (!koDockerRepo) {
    console.error("Environment variable KO_DOCKER_REPO is not defined");
    process.exit(-1);
} else if (verbose) {
    console.log("Going to use KO_DOCKER_REPO: " + process.env['KO_DOCKER_REPO']);
}

if (!argv['tag']) {
    console.error("tag is not defined");
    process.exit(-1);
} else if (verbose) {
    console.log("Going to use tag: " + argv['tag']);
}

const glob = require("glob")

// TODO: handle errors
const files = glob.sync(argv['glob']);

let allImageRefs = new Set();
for (let file of files) {
    if (verbose) {
        console.log("Checking file " + file);
    }
    const yaml = YAML.parse(readFileSync(file, 'utf8'), {mapAsMap: false});
    const imageRefs = findImageRefs(yaml, argv['prefix']);
    if (verbose && imageRefs.size) {
        console.log("Found refs: " + [...imageRefs]);
    }
    allImageRefs = new Set([...allImageRefs, ...imageRefs]);
}

if (verbose) {
    console.log("List of found images: " + [...allImageRefs]);
}

for (let imageRef of allImageRefs) {
    const cleanImageRef = imageRef.substring((argv['prefix'] + ":").length);
    const filePath = argv['baseDir'] + "/" + cleanImageRef;
    const imageName = process.env['KO_DOCKER_REPO'] + "/" + basename(cleanImageRef, '.js') + ":" + argv['tag'];
    buildImage(filePath, imageName);
}


function buildImage(filePath, imageName) {
    console.log("Building " + filePath + " as " + imageName)

    // TODO:
    // - build using the Dockerfile in the hack/ dir
    // - publish
    // -
}

function findImageRefs(yaml, prefix) {
    let result = new Set();
    if (!yaml) {
        return result;
    }
    for (let [subKey, subValue] of Object.entries(yaml)) {
        if (subKey === "image") {
            if (subValue.startsWith(prefix + ":")) {
                result.add(subValue);
            }
        } else if (typeof subValue === "object") {
            let subImageRefs = findImageRefs(subValue, prefix);
            result = new Set([...result, ...subImageRefs]);
        }
    }
    return result;
}


