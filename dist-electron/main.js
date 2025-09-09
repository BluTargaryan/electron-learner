import { app, BrowserWindow, Menu } from 'electron';
import { ipcMainOn, isDev } from './util.js';
import { pollResources } from './resourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { getStaticData } from './resourceManager.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';
import { ipcMainHandle } from './util.js';
Menu.setApplicationMenu(null);
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        },
        frame: false
    });
    if (isDev()) {
        console.log('Loading dev server URL');
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        console.log('Loading production build');
        mainWindow.loadFile(getUIPath());
    }
    pollResources(mainWindow);
    ipcMainHandle("getStaticData", () => {
        return getStaticData();
    });
    ipcMainOn("sendFrameAction", (payload) => {
        switch (payload) {
            case 'CLOSE':
                mainWindow.close();
                break;
            case 'MINIMIZE':
                mainWindow.minimize();
                break;
            case 'MAXIMIZE':
                mainWindow.maximize();
                break;
        }
    });
    createTray(mainWindow);
    handleCloseEvents(mainWindow);
    createMenu(mainWindow);
});
function handleCloseEvents(mainWindow) {
    let willClose = false;
    if (willClose) {
        return;
    }
    mainWindow.on('close', (e) => {
        e.preventDefault();
        mainWindow.hide();
        if (app.dock) {
            app.dock.hide();
        }
        // willClose = true
    });
    app.on('before-quit', () => {
        willClose = true;
    });
    mainWindow.on('show', () => {
        willClose = false;
    });
}
