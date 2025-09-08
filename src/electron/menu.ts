import { app, BrowserWindow, Menu } from "electron";
import { isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
   Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
        label: process.platform === 'darwin' ? 'undefined' : 'App',
        type: 'submenu',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit()
            },
            {
                label: 'Developer Tools',
                click: () => mainWindow.webContents.openDevTools(),
                visible: isDev()
            }
        ]
    },
    {
        label:'View',
        type: 'submenu',
        submenu: [
            {
                label: 'CPU'
            },
            {
                label: 'RAM'
            },
            {
                label: 'Storage'
            }
        ]
    }
   ]))
}