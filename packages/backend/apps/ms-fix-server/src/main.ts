import FIXServer from 'fix-over-tcp/server';
const fixServer = new FIXServer();
fixServer.createServer('localhost', 9878, 'tcp');
fixServer.on('message', (message) => {
    console.log('server received message', message.description, message.string);
});