import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
const POLL_INTERVAL = 5000;
export function pollResources(mainWindow) {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = await getRamUsage();
        const storageData = await getStorageData();
        mainWindow.webContents.send('statistics', { cpuUsage, ramUsage, storageUsage: storageData.usage });
    }, POLL_INTERVAL);
}
export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);
    return {
        totalStorage,
        cpuModel,
        totalMemoryGB
    };
}
function getCpuUsage() {
    return new Promise((resolve, reject) => {
        osUtils.cpuUsage(resolve);
    });
}
function getRamUsage() {
    return new Promise((resolve) => {
        resolve(1 - osUtils.freememPercentage());
    });
}
function getStorageData() {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.blocks * stats.bsize;
    const free = stats.bfree * stats.bsize;
    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total
    };
}
