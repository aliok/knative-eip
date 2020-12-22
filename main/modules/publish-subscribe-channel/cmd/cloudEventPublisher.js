const axios = require("axios").default;
const {HTTP, CloudEvent} = require("cloudevents");

const {registerHooks, terminate} = require("./lib/exit");
registerHooks();

// tag::read-sink[]
const sinkUrl = process.env.K_SINK;
if (!sinkUrl) {
    terminate("Environment variable K_SINK is not defined", -1);
    return;
}
// end::read-sink[]

// tag::send[]
let lastMessageId = 0;
let sendMessage = function () {
    try {
        const ce = new CloudEvent({
            type: "dev.knative.sample",
            source: "dev.knative.eip-tutorial",
            data: "Hello world! Message #" + lastMessageId
        });
        const message = HTTP.binary(ce); // Or HTTP.structured(ce)

        axios({
            method: "post",
            url: sinkUrl,
            data: message.body,
            headers: message.headers,
        });

        lastMessageId++;
    } catch (e) {
        console.log(e);
    }
};

setInterval(sendMessage, 1000);
// end::send[]
