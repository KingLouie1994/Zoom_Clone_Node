# Zoom_Clone_Node

This project was about understanding and applying the basics of WebRTC, WebSockets and peer to peer communication. The result is a Zoom clone that masters the most rudimentary functions of its big role model.

This project was created in Node.js with the help of ejs (embedded JavaScript), socket.io, peerjs and uuid.

When visiting the project, the user is redirected to a 'room' with the help of uuid. Here the browser asks for the usage rights for camera and microphone of the computer. The url you are now on can be visited by other users. Thanks to socket.io, the appearance of a new user is detected and after this user has also agreed to the use of the camera and microphone, a video call is made via peerjs and the image and sound are transmitted.

Once the video call is stable, users can mute themselves at any time or turn off their camera to participate in the call exclusively via audio. 

There is also a chat that users can use to write to each other. 

This Zoom clone has worked stably with up to 4 people so far. I haven't tried out more yet.

The project is successfully deployed on Heroku!

To test and visit the project click this line [I'm an inline-style link](https://zoom-clone-fullstack-2021.herokuapp.com/)
