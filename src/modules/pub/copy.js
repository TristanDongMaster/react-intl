import { message } from 'antd';

window.virElement = null
export function initCopy() {
    let virElement = document.createElement('input');
    virElement.style.cssText = 'display:none; backgroundColor:transparent; borderStyle:none';
    document.body.appendChild(virElement);
    window.virElement = virElement
}
export function copy(value) {
    window.virElement.style.display = 'block';
    window.virElement.setAttribute('value', value);
    window.virElement.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        message.success('复制成功');
    }
    window.virElement.style.display = 'none';
}