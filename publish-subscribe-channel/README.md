# Publish-Subscribe Channel

How can the sender broadcast an event to all interested receivers?

Send the event on a Publish-Subscribe Channel, which delivers a copy of a particular event to each receiver.

Link: <https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html> 

The sample implementation of this pattern in Knative is as following:

```
                                                                                               +-------------------+
                                                                                               |                   |
                                                                       +----->  Event +-------->  Subscriber A     |
                                                                       |                       |                   |
                                                                       |                       +-------------------+
                                                                       |
 +--------------------+                    +-------------------+       |
 |                    |                    |                   |       |
 |   Publisher        +----->  Event +----->      Channel      +-------+
 |                    |                    |                   |       |
 +--------------------+                    +-------------------+       |
                                                                       |
                                                                       |                       +-------------------+
                                                                       |                       |                   |
                                                                       +----->  Event +-------->  Subscriber B     |
                                                                                               |                   |
                                                                                               +-------------------+
``` 

The publisher is an application that submits events to the Knative channel.
Subscriber A and B are subscribed to the channel, and they both receive events from the channel.


# Knative Implementation

```yaml


```
Code above creates a Knative [channel](https://knative.dev/docs/eventing/channels/), specifically an `InMemoryChannel`. 
Other channels may also be used for various reasons such as a necessity for persistence or when the subscribers do not
have the same speed as the publisher.
