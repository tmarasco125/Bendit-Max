//**********************************************************
//*  Bendit-Max: Interfacing with Bendit_I/O through Max   *
//*	 by Nick Hwang and Anthony T. Marasco                  *
//*  v1.0 - 2020                                           *
//**********************************************************

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
    console.log(bendit.receivedBoardMessage());
    if (bendit != null) {
        maxAPI.outlet("connectedUsers " + bendit.getConnectedUsers());
    }
	if(bendit.receivedBoardMessage()){
		var newMessage = bendit.messageFromBoard;
		maxAPI.outlet("incomingMessageFromBoard" + newMessage);
		maxAPI.post(`Received ${newMessage} from a board`);
	}
});



maxAPI.addHandler('grabMessageFromBoard', ()=>{
	console.log(bendit.messageFromBoard;
	});
maxAPI.addHandler('getSocket', () => {
  console.log(bendit.socket);
});

maxAPI.addHandler('getBenditSocket', ()=> {
	console.log(bendit.socket);
	});

maxAPI.addHandler('addDevice', (...args) => {
    console.log(bendit.devices);
    let newDevice = bendit.addDevice(args[0],args[1],args[2],args[3]);
    console.log(bendit.devices);
});

maxAPI.addHandler('getConnectedBenditBoards', () => {
	//print to the Max console
    console.log(bendit.getConnectedBenditBoards());
	//send through outlet (connect to dict)	
	maxAPI.outlet("connectedBoards " + bendit.getConnectedBenditBoards());  
});

maxAPI.addHandler('findBoard', (...args) =>{
	
	var allBoards = bendit.getConnectedBenditBoards();
	
	var matchingBoard = allBoards.filter(board => board.number == "1");
	
	
	console.log(["Is this the board you're looking for?: ", matchingBoard]);
	
});


maxAPI.addHandler('setSwitch', (...args) =>{
	

	
	var matchingDevice = bendit.devices.filter(board => board.boardNumber == args[0]);
	
	//matchingBoard.switches[args[1]].setSwitch(args[2]);
	//Nick: matchingDevice returns an array. Since it should only have one item in it (the found device), you have to do this 
	//(see line 76) to talk to one of its switches
	//console.log(["Is this the board you're looking for?: ", matchingDevice[0].switches[]);
	matchingDevice[0].switches[args[1]].setSwitch(args[2]);
	
	console.log(bendit.messageFromBoard);
	});
	
	
// maxAPI.addHandler('addDevice', (args) => {
//     let cd2 = bendit.addDevice(args);
// });


// maxAPI.post(BendIt.Browser)
