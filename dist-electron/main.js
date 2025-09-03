import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { pollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';
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
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
    pollResources();
});
