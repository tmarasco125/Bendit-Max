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
var boards;

// This will be printed directly to the Max console
maxAPI.post(`Loaded the ${path.basename(__filename)} script`);

// const socket = io.connect('http://remote-collab.herokuapp.com/');

socket.on('connect', () => {
  maxAPI.outlet(socket.id);
  maxAPI.outlet("Connected to server");
  bendit = new BendIt.Browser(socket);
  console.log()
  if (bendit != null) {
    maxAPI.outlet("connectedUsers " + bendit.getConnectedUsers());
  }
});

socket.on('fromBoard',(data) => {
	maxAPI.outlet("messageFromBoard " + data);
});

socket.on('grab_board_list', () => {
  maxAPI.outlet('yo');
});

maxAPI.addHandler('getSocket', () => {
  console.log(bendit.socket);
});

maxAPI.addHandler('getBenditSocket', () => {
  console.log(bendit.socket);
});

maxAPI.addHandler('addDevice', (...args) => {
  console.log(bendit.devices);
  let cd2 = bendit.addDevice(args[0], args[1], args[2], args[3]);
  console.log(bendit.devices);
});

maxAPI.addHandler('getConnectedBenditBoards', () => {
  var board = {};
  boards = bendit.getConnectedBenditBoards();
  // board  = board;
  // console.log(typeof board);
  // console.log(typeof board);
  console.log(boards.length);
  console.log(boards[0]);

  console.log(boards.length);
  console.log(boards);


  // sort boards by number  ---- *** could do this on server end... later
  boards = boards.sort(compare);
  console.log(boards);
  maxAPI.outlet(["connectedBoards", boards]);


  // automagically connected devices in max
  for (var board of boards) {
    // switches, pots, motors, boardnum
    bendit.addDevice(6, 6, 1, board.number);
  }

  // tell max the board numbers
  for (var board of boards) {
    // boardnums.push({num: board.number});
    maxAPI.outlet("boardnumbers", board.number);
  }

});

maxAPI.addHandler('setSwitch', (...args) => {
  // device/board number , switch number
  var matchingDevice = bendit.devices.find(board => board.boardNumber == args[0]);
  if (matchingDevice != null) {
    // console.log("---------------------------------------------");
	//executes within console.log():
    console.log(matchingDevice.switches[args[1]].setSwitch(args[2]));
  }
  //console.log(bendit.messageFromBoard);
});

maxAPI.addHandler('setPot', (...args) => {
  // device/board number , pot number, state (0-127)
  var matchingDevice = bendit.devices.find(board => board.boardNumber == args[0]);
  if (matchingDevice != null) {
    // console.log("---------------------------------------------");
    console.log(matchingDevice.pots[args[1]].setPot(args[2]));
  }
 // console.log(bendit.messageFromBoard);
});

maxAPI.addHandler('runMotor', (...args) => {
  // device/board number , motor num, speed (0-255), direction (-1 OR 1)
  if (args[3] == 0){
    args[3] = -1;
  }
  var matchingDevice = bendit.devices.find(board => board.boardNumber == args[0]);
  if (matchingDevice != null) {
    // console.log("---------------------------------------------");
    console.log(matchingDevice.motors[args[1]].run(args[2], args[3]));
  }
  //console.log(bendit.messageFromBoard);
});

maxAPI.addHandler('stopMotor', (...args) => {
  // stop motor
  var matchingDevice = bendit.devices.find(board => board.boardNumber == args[0]);
  if (matchingDevice != null) {
    // console.log("---------------------------------------------");
    console.log(matchingDevice.motors[args[1]].stop());
  }
  //console.log(bendit.messageFromBoard);
});






function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const boardA = a.number;
  const boardB = b.number;

  let comparison = 0;
  if (boardA > boardB) {
    comparison = 1;
  } else if (boardA < boardB) {
    comparison = -1;
  }
  return comparison;
}


// maxAPI.post(BendIt.Browser)
