const qrCodeGenerator = document.querySelector(".qr-code-generator");
const qrCode = document.querySelector(".qr-code");
const qrCodeValue = document.querySelector(".qr-code-value");
const url = document.querySelector("form textarea");
const form = document.querySelector("form");
const buttonDownload = document.querySelector(".button-download");
const downloadContainer = document.querySelector(".download-container");
let canvas;
let qrCodeVerification = false;

new QRCode(qrCodeGenerator, "https://github.com/Dev-Pedro75");

function createQrCode() {
  qrCodeGenerator.innerHTML = "<div class='loading'></div>";
  setTimeout(() => {
    const currentUrl = url.value;
    qrCodeGenerator.innerHTML = "";
    downloadContainer.classList.remove("disable");
    qrCodeVerification = true;
    new QRCode(qrCodeGenerator, currentUrl);
  }, 1000);
}

function createId() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const id = `qr-code ${hours}-${minutes}-${
    hours + minutes + seconds + milliseconds
  }`;

  return id;
}

function downloadQrCode() {
  if (!qrCodeVerification) {
    return;
  }

  canvas = document.querySelector("canvas");
  const a = document.querySelector(".download");
  a.download = createId();
  a.href = canvas.toDataURL();
  a.click();
}

buttonDownload.addEventListener("click", downloadQrCode);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createQrCode();
  qrCodeVerification = false;
});
