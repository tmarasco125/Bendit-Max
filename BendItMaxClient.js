const path = require('path');
const maxAPI = require('max-api');
const io = require('socket.io-client');
const BendIt = require('benditbrowser');

const socket = io.connect('http://bendit-web-interface.herokuapp.com');

var bendit;

// This will be printed directly to the Max console
maxAPI.post(`Loaded the ${path.basename(__filename)} script`);

// const socket = io.connect('http://remote-collab.herokuapp.com/');

socket.on('connect', () => {
    maxAPI.outlet(socket.id);
    maxAPI.outlet("Connected to server");
    bendit = new BendIt.Browser(socket);
    console.log ()
    if (bendit != null) {
        maxAPI.outlet("connectedUsers " + bendit.getConnectedUsers());
    }
});

socket.on('grab_board_list', () => {
    maxAPI.outlet('yo');
});

maxAPI.addHandler('getSocket', () => {
  console.log(bendit.socket);
});

maxAPI.addHandler('getBenditSocket', ()=> {
	console.log(bendit.socket);
	});

maxAPI.addHandler('addDevice', (...args) => {
    console.log(bendit.devices);
    let cd2 = bendit.addDevice(args[0],args[1],args[2],args[3]);
    console.log(bendit.devices);
});

maxAPI.addHandler('getConnectedBenditBoards', () => {
    bendit.getConnectedBenditBoards();
    console.log(bendit.devices);
});


// maxAPI.addHandler('addDevice', (args) => {
//     let cd2 = bendit.addDevice(args);
// });


// maxAPI.post(BendIt.Browser)
