import { ipcMain, WebContents } from "electron"

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(key:string,handler:()=>EventPayloadMapping[Key]){
    ipcMain.handle(key, ()=>handler())
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(key:string,webContents:WebContents,payload:EventPayloadMapping[Key]){
    webContents.send(key, payload)
}


export default isDev()