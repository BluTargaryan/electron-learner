import { ipcMain, WebContents, WebFrameMain } from "electron"
import { getUIPath } from "./pathResolver.js"
import { pathToFileURL } from "url"

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(key:string,handler:()=>EventPayloadMapping[Key]){
    ipcMain.handle(key, (event)=>{
        if (!event.senderFrame) throw new Error('No sender frame')
        validateEventFrame(event.senderFrame)
        return handler()
    })
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(key:string,webContents:WebContents,payload:EventPayloadMapping[Key]){
    webContents.send(key, payload)
}

export function validateEventFrame(frame: WebFrameMain) {
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
      return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
      throw new Error('Malicious event');
    }
  }


export default isDev()