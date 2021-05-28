const socket = io("/")
const videoGrid = document.getElementById("video-grid")
const myVideo = document.createElement("video")
const myPeer = new Peer(undefined,
    {
        host: "/",
        port: process.env.PORT || 3000
    }
)

const peers = {}
myVideo.muted = true

navigator.mediaDevices.getUserMedia(
    {
        video: true,
        audio: true
    }
).then(stream =>
{
    addVideoStream(myVideo, stream)

    myPeer.on("call", call =>
    {
        console.log("answer called")
        call.answer(stream)

        const video = document.createElement("video")
        call.on("stream", userVideoStream =>
        {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on("user-connected", userId =>
    {
        setTimeout(() => 
        {
            connectToNewUser(userId, stream)
        }, 3000)
    })
})

socket.on("user-disconnected", userId =>
{
    if(peers[userId]) peers[userId].close()
})

myPeer.on("open", id =>
{
    socket.emit("join-room", ROOM_ID, id)
})

function connectToNewUser(userId, stream)
{
    const call = myPeer.call(userId, stream)
    const video = document.createElement("video")

    call.on("stream", userVideoStream =>
    {
        addVideoStream(video, userVideoStream)
    })

    call.on("close", () =>
    {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream)
{
    video.srcObject = stream
    video.addEventListener("loadedmetadata", () =>
    {
        video.play()
    })
    videoGrid.append(video)
}