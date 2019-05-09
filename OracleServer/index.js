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
  let eventlist = EventList.decode(message.content).events;
  eventlist.map(event => {
    if (event.eventType == "ClientTP/NewUser") {
      Oracleservice.ClaimGift(event.attributes[0].value);
    } else if (event.eventType == "ClientTP/BuyUnit") {
      Oracleservice.BuyUnit(JSON.parse(event.attributes[0].value));
    } else if (event.eventType == "ClientTP/BuyPower") {
      Oracleservice.BuyPower(JSON.parse(event.attributes[0].value));
    } else if (event.eventType == "ClientTP/BuyMax") {
      Oracleservice.BuyMax(JSON.parse(event.attributes[0].value));
    }
  });
}

function EventSubscribe(Url) {
  const NewUser = EventSubscription.create({
    eventType: "ClientTP/NewUser"
  });
  const BuyUnit = EventSubscription.create({
    eventType: "ClientTP/BuyUnit"
  });
  const BuyPower = EventSubscription.create({
    eventType: "ClientTP/BuyPower"
  });
  const BuyMax = EventSubscription.create({
    eventType: "ClientTP/BuyMax"
  });
  const subsc_request = ClientEventsSubscribeRequest.encode({
    subscriptions: [NewUser, BuyUnit, BuyPower, BuyMax]
  }).finish();

  myStream.connect(() => {
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
