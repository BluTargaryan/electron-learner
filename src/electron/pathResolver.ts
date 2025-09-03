import { app } from "electron";
import path from "path";
import { isDev } from "./util.js";

export function getPreloadPath() {
    return path.join(app.getAppPath(), isDev() 
    ? 'preload.js' : '.', '..',
     '/dist-electron/preload.cjs'    
)
}