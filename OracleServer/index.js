const {
  Message,
  EventFilter,
  EventList,
  FilterType,
  EventSubscription,
  ClientEventsSubscribeRequest,
  ClientEventsSubscribeResponse
} = require("sawtooth-sdk/protobuf");
const { Stream } = require("sawtooth-sdk/messaging/stream");
const { TextDecoder, TextEncoder } = require("text-encoding/lib/encoding");
var { OracleService } = require("./Service");

const Url = "tcp://validator:4004";
let myStream = new Stream(Url);
let Oracleservice = new OracleService();

// returns the subscription request status
function checkStatus(response) {
  let msg = "";
  if (response.status === 0) {
    msg = "subscription : OK";
  } else if (response.status === 1) {
    msg = "subscription : GOOD ";
  } else {
    msg = "subscription failed !";
  }
  return msg;
}

function getEventsMessage(message) {
  // Write your event handling code here
  console.log("EVENTS....................");
  let eventlist = EventList.decode(message.content).events;
  eventlist.map(event => {
    if (event.eventType == "ClientTP/NewUser") {
      Oracleservice.ClaimGift(event.attributes[0].value);
    }
  });
}

function EventSubscribe(Url) {
  console.log("SUBSC !!!!!!!!!!!!!!!!!!!!!!!!!");

  const NewUser = EventSubscription.create({
    eventType: "ClientTP/NewUser"
  });
  const subsc_request = ClientEventsSubscribeRequest.encode({
    subscriptions: [NewUser]
  }).finish();

  myStream.connect(() => {
    console.log("CONNECTIING TO VALIDATOR ");
    myStream
      .send(Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST, subsc_request)
      .then(response => {
        return ClientEventsSubscribeResponse.decode(response);
      })
      .then(decoded_resp => {
        console.log(checkStatus(decoded_resp));
      });
    myStream.onReceive(getEventsMessage);
  });
}

EventSubscribe(Url);
