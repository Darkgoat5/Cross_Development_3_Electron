// Preload
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api',
{
    ipcReceiveReplyFromMain: (channel, listener) => {
        ipcRenderer.on(channel, listener);
    },
    getElectronVersion: () => {
        return process.versions.electron; //also possible 'node' or 'chrome'
    },
    saveMovies: (movies) => ipcRenderer.invoke('movies:save', movies),
    loadMovies: () => ipcRenderer.invoke('movies:load')
}
);

console.log('preload.js loaded');