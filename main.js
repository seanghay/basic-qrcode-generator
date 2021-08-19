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


function onValueChange() {
  const value = qrcodeValueInput.value;
  if (!value) return;
  QRCode.toCanvas(qrcodeCanvas, value, {
    width: 350,
    
   }, onQRCodeComplete);

  const encoded = base64.encode(value);
  const url = new URL(location.href);
  url.searchParams.set('v',  encoded);
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
    qrcodeValueInput.value = decoded;
    onValueChange();
  }

}

main();