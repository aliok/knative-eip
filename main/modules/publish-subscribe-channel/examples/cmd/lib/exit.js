const {writeFile} = require('fs');

/**
 * Register handlers for kill signals and uncaught exceptions.
 */
function registerHooks() {
    let logExit = function () {
        console.log("Exiting");
        process.exit();
    };

    // handle graceful exit
    //do something when app is closing
    process.on('exit', logExit);
    //catches ctrl+c event
    process.on('SIGINT', logExit);
    process.on('SIGTERM', logExit);
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', logExit);
    process.on('SIGUSR2', logExit);

    process.on('uncaughtException', function (err) {
        console.error("Uncaught exception:")
        console.error(err);
        terminate("Uncaught exception: " + err.message);
    });
}

function terminate(msg = "", exitCode = -1) {
    console.log("Exiting with code " + exitCode + " and message: " + msg);

    writeFile("/dev/termination-log", msg, function (err, data) {
        if (err) {
            console.error("Unable to write to /dev/termination-log.");
            console.error(err);
            process.exit(exitCode);
        }
        process.exit(exitCode);
    });
}

module.exports = {
    registerHooks,
    terminate,
};
