import { app, Menu } from "electron";
import { ipcWebContentsSend, isDev } from "./util.js";
export function createMenu(mainWindow) {
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
            label: 'View',
            type: 'submenu',
            submenu: [
                {
                    label: 'CPU',
                    click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'CPU'),
                },
                {
                    label: 'RAM',
                    click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'RAM'),
                },
                {
                    label: 'Storage',
                    click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'STORAGE'),
                }
            ]
        }
    ]));
}
