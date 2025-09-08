import { app, Menu, Tray } from "electron";
import path from "path";
import { getAssetsPath } from "./pathResolver.js";
export function createTray(mainWindow) {
    const tray = new Tray(path.join(getAssetsPath(), process.platform === 'darwin' ? 'trayLogo.png' : 'trayLogoAlt.png'));
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Open',
            click: () => {
                mainWindow.show();
                if (app.dock) {
                    app.dock.show();
                }
            },
            type: 'normal'
        },
        {
            label: 'Quit',
            click: () => app.quit()
        }
    ]));
}
