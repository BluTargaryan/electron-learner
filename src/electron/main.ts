import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { isDev } from './util.js'
import { pollResources } from './resourceManager.js'
import { getPreloadPath, getUIPath } from './pathResolver.js'
import { getStaticData } from './resourceManager.js'


app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload:getPreloadPath()
        }
    })
    if(isDev()) {
        console.log('Loading dev server URL') 
        mainWindow.loadURL('http://localhost:5123')
    } else {
        console.log('Loading production build')
        mainWindow.loadFile(getUIPath())
    }

    pollResources(mainWindow)
    ipcMain.handle("getStaticData", ()=>{
        return getStaticData()
    })
})