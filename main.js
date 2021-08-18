import QRCode from 'qrcode'
import './style.css'

const qrcodeCanvas = document.getElementById('qrcode-canvas');
const qrcodeValueInput = document.getElementById('qrcode-value');

function onQRCodeComplete(e) {
  if (e) {
    console.error(e);
    return;
  }
}

function onValueChange() {
  const value = qrcodeValueInput.value;
  if (!value) return;
  QRCode.toCanvas(qrcodeCanvas, value, {
    width: 350,
    
   }, onQRCodeComplete);
}

qrcodeValueInput.addEventListener('input', debounce(onValueChange, 100));

function debounce (fn, wait = 1) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.call(this, ...args), wait)
  }
}