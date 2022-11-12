import FIXParser, {
    Field,
    Fields,
    Messages,
    Side,
    OrderTypes,
    HandlInst,
    TimeInForce,
    EncryptMethod
} from 'fix-over-tcp/FIXParser';
const fixParser = new FIXParser();
const order = fixParser.createMessage(
    new Field(Fields.MsgType, Messages.NewOrderSingle),
    new Field(Fields.MsgSeqNum, fixParser.getNextTargetMsgSeqNum()),
    new Field(Fields.SenderCompID, 'SENDER'),
    new Field(Fields.SendingTime, fixParser.getTimestamp()),
    new Field(Fields.TargetCompID, 'TARGET'),
    new Field(Fields.ClOrdID, '11223344'),
    new Field(Fields.HandlInst, HandlInst.AutomatedExecutionNoIntervention),
    new Field(Fields.OrderQty, '123'),
    new Field(Fields.TransactTime, fixParser.getTimestamp()),
    new Field(Fields.OrdType, OrderTypes.Market),
    new Field(Fields.Side, Side.Buy),
    new Field(Fields.Symbol, '123.HK'),
    new Field(Fields.TimeInForce, TimeInForce.Day)
);
console.log(order.encode('|'));

fixParser.connect({ host: 'localhost', port: 9878, sender: 'BANZAI', target: 'EXEC', fixVersion: 'FIX.4.4', heartbeatIntervalMs: 10000 });
fixParser.on('open', () => {
    console.log('Connection is open');
    fixParser.send(order)
    console.log("sent Packet.. ", order.encode().toString())

});
fixParser.on('message', (message) => {
    console.log('message: ' + message);
    // Received FIX message
});
fixParser.on('close', () => {
    console.log('Disconnected');
});