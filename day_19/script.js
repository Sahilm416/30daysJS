const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const shots = document.getElementById("shots");

const snap_button = document.getElementById("snap");

const get_video = async () => {
  try {
    const media_stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    console.log(media_stream);

    video.srcObject = media_stream;
    video.play();
  } catch (e) {
    console.log(e);
  }
};

get_video();

snap_button.addEventListener("click", () => {
  const image_data = canvas.toDataURL("image/jpeg");
  const ele = document.createElement("div");
  ele.innerHTML = `<a href=${image_data} download="selmon"><img src=${image_data}  alt="snap"/></a>`;
  shots.append(ele);
});

const paint_pn_canvas = () => {
  const rect = video.getBoundingClientRect();
  console.log(rect.width, rect.height);
  canvas.width = rect.width;
  canvas.height = rect.height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, rect.width, rect.height);
  }, 16);
};

paint_pn_canvas();
