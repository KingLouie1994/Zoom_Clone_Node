const socket = io("/");

// Create a video element
const myVideo = document.createElement("video");
myVideo.muted = false;

// Initialising peerjs
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "4000",
});

// Create variable that accesses div in ejs file
const videoGrid = document.getElementById("video-grid");

// Create globally available variable for the video stream
let myVideoStream;

// Get access to different media devices of the main device
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, myVideoStream);
    // Using peerjs to 'answer' an incoming call
    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
    // Using socket.io to detect if someone joins a room
    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

// Using peerjs and socket.io to add user to room
peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

// Using peerjs to 'call' the other users in the room
const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

// Function to append the video stream to ejs file
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

// Handle mute and unmute
const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `;
  document.querySelector(".main__mute__button").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `;
  document.querySelector(".main__mute__button").innerHTML = html;
};

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

// Handle camera on/off


// Handle messages
let message = $("input");
$("html").keydown((e) => {
  if (e.which == 13 && message.val().length !== 0) {
    socket.emit("message", message.val());
    message.val("");
  }
});

socket.on("createMessage", (message) => {
  $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
  scrollToBottom();
});

const scrollToBottom = () => {
  const d = $(".main__chat__window");
  d.scrollTop(d.prop("scrollHeight"));
};
