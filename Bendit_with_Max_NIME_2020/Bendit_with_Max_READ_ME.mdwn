## Setting it Up

To grab the example patches and the Bendit-Max library discussed below, [clone the Bendit-Max repo found here](https://github.com/tmarasco125/Bendit-Max).

## Sending and receiving messages

In any of the included patches, start by clicking the install message labelled '1' of you have never run the Bendit programs before, followed by the start message labeled '2'. This will begin the connection to Bendit_io, and allow the patches to respond to messages from the board. Then, click on the message "getConnectedBoards" located next to 'start' and you will be able to use the interface below.

When the Bendit boards receive a switch-based command, they will return a message containing an identification number and a random value between 0 and 127. These patches will utilize thin information in order to create and alter aspects of the patch based on the interactions with Bendit_io via internet server connection. Each of the patches contained in this folder interact with the incoming data differently, and can be configured to fit a variety of needs. All included patches are set up to route data both to and from up to 4 connected boards, and indicate when a message is received from each board. In the patches utilizing inputs from multiple boards, all inputs from one board are independent from the other boards.

In order to ensure the max patches function as intended, please ensure that the following files are present within the **same folder**:

* BenditMaxClient.maxpat
* BenditRouting.maxpat
* BenditMaxClient.js
* drumLoop.wav
* The 4 NIME_2020 patches as described below

## Sending Commands

In each of the four patches, the interface for sending commands is located below the startup buttons that were previously mentioned. After getting the connected boards, you can select the board number that you wish to communicate with, and then the switch, potentiometer, or motor you wish to command on that board. Set the value and use the on-screen button to send the command. Once the board receives the command it will return a message. (mentioned above) EAch of the four patches included here will respond to that message differently as detailed below:

## Patch 1: MIDI Control (yellow)

Receives the incoming random number and routes it to control the output of MIDI data, which can bea heard on the local device. By default the patch responds to data from bendit board 1 and 2 in the following ways:

* Board 1: values from board 1 are treated as a frequency. In order to keep the sound within a normal hearing range, they are multiplied by three before being converted to a MIDI value.
* Board 2: values from board 2 are treaded as a MIDI value

These MIDI values are represented graphically on the screen via the keyboard, and output as audio via the makenote and noteout objects. 

In order to change which boards the patch receives data from, simply change the connections from the route object to the desired configuration.

## Patch 2: Filter Control (red)

Receives the incoming random number in order to control the values of Max's biquad filter object. Be sure to first initialize the patch audio by clicking on the DAC labeled '3'. cThis patch utilizes the incoming data from boards 1 through 4 in the following ways:

* Board 1: Values are scaled the incoming number to a range of 1-9. This is then used to select the filter response from a list of preset options.
* Board 2: Values are treated as the cutoff/center frequency for the filter. Incoming values are multiplied by 5 before being applied to the filter
* Board 3: Values are used to set the gain of the filter. Values are scaled to a range of 0-10 dB to help minimize excessive sound volumes.
* Board 4: Values are used to set the sharpness of the filter.

The filter is applied to white noise after the application of the scaled data from the bendit boards. The final arrangement of the filter is displayed visually in the patch, and the final output volume can be adjusted via the on-screen gain slider.

In order to change which boards the patch receives data from, simply change the connections from the route object to the desired configuration.

## Patch 3: Tempo Control (blue)

This patch will automatically load the included drumLoop.wav file upon startup. Start by enabling audio by clicking on the DAC labelled '3'. This patch takes in data from boards labelled 2 and 3 in order to process the playback speed of the .wav file.

* Board 2: Values are scaled to a range of 750-18000. These values will be the number of milliseconds it takes the play~ object to play through the drumLoop.wav file. This tempo is viewable in the box labelled 'playback duration'.
* Board 3: Vales are scaled to a range of 0-1. These values are used to stop the current playback until a new tempo value is received from board 2.

In order to change which boards the patch receives data from, simply change the connections from the route object to the desired configuration.

## Patch 4: Video Effect Control (purple)

Press the play and loop button in the video file labelled 3. You should then see the video file begin to play in a separate window

This patch utilizes incoming values from up to 4 connected boards in order alter the playback of a short video file. The values are utilized in the following ways:

* Board 1: Values from this board are utilized in 2 different ways:
    * Values are scaled to a range of 0-1 and utilized to turn color based effects on and off.
    * Values are used to adjust the amount of delay in the delayr object
* Board 2: Values are scaled to a range of 0-1 and used to control the amount of horizontal pixelation within the pixl8r object
* Board 3:Values from this board are utilized in 2 different ways:
    * Values are scaled to a range of 0-1 and utilized to adjust the feedback amount in the delayr object.
    * Values are scaled to a range of 0-1 and utilized to adjust the vertical pixelation within the pixel8r object.
* Board 4: Values from this board are utilized in 2 different ways:
    * Values are scaled to a range of 0-1 and utilized to turn the delay and pixelation effects on and off.
    * Values are scaled to a range of 0-1 and used to control the crossfade amount in the delayr object.

In order to change which boards the patch receives data from, simply change the connections from the route object to the desired configuration.

Please keep in mind that if you attempt to communicate with a component that is not connected, then no response will happen on the physical hardware, and if you attempt to communicate with a board that is not properly identified, you will receive an error message. If more than four boards are to be used at once, then an additional outlet will need to be added to the BenditRouting.maxpat file to accommodate for the additional messages.
