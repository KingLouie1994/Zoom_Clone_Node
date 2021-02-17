// Create a video element
const myVideo = document.createElement("video");
myVideo.muted = true;

// Create variable that accesses div in ejs file
const videoGrid = document.getElementById("video-grid");

// Function to append the video stream to ejs file
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

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
