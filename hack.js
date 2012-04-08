var dgram = require('dgram')
var hexy = require('hexy')
Packet = require('./packet').Packet;


var mdns = dgram.createSocket("udp4");

mdns.on("message", function (msg, rinfo) {
  console.log("received from: " + rinfo.address + ":" + rinfo.port);
 // console.log(hexy.hexy(msg))
  var request = new Packet(mdns)
  request.unpack(msg);
//  console.log(request.toString())
  console.log(request.objectify())
  
});

mdns.on("listening", function () {
  var address = mdns.address();
  console.log("mdns listening " +
      address.address + ":" + address.port);
});

mdns.on("error", function (err) {
    console.log('ERROR:',err)
})

mdns.bind(5353,'224.0.0.251');
mdns.setBroadcast(true)
mdns.addMembership('224.0.0.251')

/*

var dns = require('../dns'),
  util = require('util');

var question = dns.Question({
  name: 'www.google.com',
  type: dns.consts.NAME_TO_QTYPE.A,
});


response.answer.push(dns.A({
  name: request.question[0].name,
  address: '127.0.0.1',
  ttl: 600,
}));
response.answer.push(dns.A({
  name: request.question[0].name,
  address: '127.0.0.2',
  ttl: 600,
}));

*/
