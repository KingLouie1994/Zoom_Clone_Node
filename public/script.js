const socket = io("/");

// Create a video element
const myVideo = document.createElement("video");
myVideo.muted = true;

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
  });

// Using socket.io to detect if someone joins a room
socket.emit("join-room", ROOM_ID);
socket.on("user-connected", () => {
  connectToNewUser();
});

const connectToNewUser = () => {
  console.log("new user");
};

// Function to append the video stream to ejs file
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
