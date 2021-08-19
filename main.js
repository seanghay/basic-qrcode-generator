import QRCode from 'qrcode'
import './style.css'
import base64 from 'base-64'

const qrcodeCanvas = document.getElementById('qrcode-canvas');
const qrcodeValueInput = document.getElementById('qrcode-value');

function onQRCodeComplete(e) {
  if (e) {
    console.error(e);
    return;
  }
}

function base64QueryParam() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get('v');
}

function clearScreen() {
  const ctx = qrcodeCanvas.getContext('2d');
  const width = qrcodeCanvas.width;
  const height = qrcodeCanvas.height;
  const fontSize = 130;

  ctx.clearRect(0, 0, width, height);
  ctx.font = `${fontSize}px serif`;
  
  ctx.fillText('❤️', (width - fontSize) / 2, (height + fontSize - 20) / 2);
}


function onValueChange() {
  const value = qrcodeValueInput.value;
  if (!value) {
    setValueParam(null)
  clearScreen();
    return;
  };

  QRCode.toCanvas(qrcodeCanvas, value, {
    width: 350,
    
   }, onQRCodeComplete);

  const encoded = base64.encode(encodeURIComponent(value));
  setValueParam(encoded);
}

function setValueParam(value) {
  const url = new URL(location.href);

  if (!value) {
    url.searchParams.delete('v')
  } else {
    url.searchParams.set('v',  value);
  }

  history.replaceState(null, '', url);
}

let timeout;
function debounce (fn, wait = 1) {
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.call(this, ...args), wait)
  }
}


function main() {

  qrcodeValueInput.addEventListener('input', debounce(onValueChange, 50));
  const value = base64QueryParam();

  if (value) {
    const decoded = base64.decode(value);
    qrcodeValueInput.value = decodeURIComponent(decoded);
    onValueChange();
  } else {
    clearScreen()
  }


  qrcodeCanvas.addEventListener('click', function() {
    qrcodeCanvas.classList.toggle('dark')
  })

}

main();