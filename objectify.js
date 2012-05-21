Packet.prototype.objectify = function() {

  var o = {}

  o.header = {}
  switch (this.opcode) {
    case 0: o.header.opcode = 'QUERY'; break;
    case 1: o.header.opcode = 'IQUERY'; break;
    case 2: o.header.opcode = 'STATUS'; break;
    default: o.header.opcode = 'UNKNOWN'; break;
  }
  o.header.status = consts.RCODE_TO_NAME[this.rcode]
  o.header.id = this.id
  o.header.flags = {}
  
  if (this.qr) o.header.flags.qr = true
  if (this.rd) o.header.flags.rd = true
  if (this.aa) o.header.flags.aa = true
  if (this.tc) o.header.flags.tc = true
  if (this.ra) o.header.flags.ra = true

  o.header.count = 
    { question:  this.qdcount
    , answer: this.ancount
    , authority: this.nscount
    , additional: this.arcount
  }
  
  if (this.question.length) {
    o.question = []
    this.question.forEach(function(q) {
      var qo =
        { name: q.name
        , 'class': consts.QCLASS_TO_NAME[q.class]
        , type: consts.QTYPE_TO_NAME[q.type]
        }
      o.question.push(qo)
    });
  }

  if (this.answer.length) {
    o.answer = []
    this.answer.forEach(function(a) {
      var item =
        { name: a.name
        , ttl: a.ttl
        , 'class': consts.QCLASS_TO_NAME[a.class]
        , type: consts.QTYPE_TO_NAME[a.type]
        }
      o.answer.push(item)
    });
  }

  if (this.authority.length) {
    o.authority = []
    this.authority.forEach(function(a) {
      var item =
        { name: a.name
        , ttl: a.ttl
        , 'class': consts.QCLASS_TO_NAME[a.class]
        , type: consts.QTYPE_TO_NAME[a.type]
        }
      o.authority.push(item)
    });
  }

  if (this.additional.length) {
    if (this.additional[0].type !== consts.NAME_TO_QTYPE.OPT) {
      o.additional = []
      this.additional.forEach(function(a) {
        var item =
          { name: a.name
          , ttl: a.ttl
          , 'class': consts.QCLASS_TO_NAME[a.class]
          , type: consts.QTYPE_TO_NAME[a.type]
          }
        o.additional.push(item)
      });
    }
  }

  ret.push(';; END');

  return ret.join('\n');
};
