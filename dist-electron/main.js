import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { isDev } from './util.js';
import { pollResources } from './resourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { getStaticData } from './resourceManager.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';
Menu.setApplicationMenu(null);
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
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
    ipcMain.handle("getStaticData", () => {
        return getStaticData();
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
