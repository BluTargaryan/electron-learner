import { ipcMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
export function isDev() {
    return process.env.NODE_ENV === 'development';
}
export function ipcHandle(key, handler) {
    ipcMain.handle(key, (event) => {
        if (!event.senderFrame)
            throw new Error('No sender frame');
        validateEventFrame(event.senderFrame);
        return handler();
    });
}
export function ipcWebContentsSend(key, webContents, payload) {
    webContents.send(key, payload);
}
export function validateEventFrame(frame) {
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious event');
    }
}
export default isDev();
