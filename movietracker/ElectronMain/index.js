// index.js
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

// Handle Squirrel events on Windows - only quit during install/update/uninstall events
if (require('electron-squirrel-startup')) {
    app.quit();
}


const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })


    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '..', 'www', 'index.html'))
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // prevents navigation
    mainWindow.webContents.on('will-navigate', (event) => event.preventDefault());

    // prevents opening new windows
    mainWindow.webContents.setWindowOpenHandler(() => {
        return { action: 'deny' };
    });
}

// https://www.youtube.com/watch?v=1rDvNDvZrnA
// Store movies.json in user data directory to avoid write permission issues in packaged app
const moviesFile = () => path.join(app.getPath('userData'), 'movies.json')

ipcMain.handle('movies:load', async () => {
    try {
        const filePath = moviesFile();
        //if the file doesnt exist there are no saved movies
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } 
    catch (err) 
    {
        console.error('Failed to load movies:', err);
    }
});

ipcMain.handle('movies:save', async (_event, movies) => {
    try 
    {
        fs.writeFileSync(moviesFile(), JSON.stringify(movies, null, 2), 'utf-8');
    } 
    catch (err) 
    {
        console.error('Failed to save movies:', err);
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
