const electron = require('electron');
const { dialog } = require('electron')
const ipcMain = require('electron').ipcMain;
const Store = require('electron-store');
const storage = new Store();
const isDev = require('electron-is-dev')

  
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600,      
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            // preload: path.join(__dirname,"./preload.js")
        }});
    
    // and load the index.html of the app.
    mainWindow.loadURL( isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("set", (event, value) =>{
    value.forEach(element => {
        console.log(app.getPath('userData'))
        let storeLevel = 'notes.' + element.id
        storage.set(storeLevel, element)
    });
    console.log(app.getPath('userData'))
})

ipcMain.on("get", (event, value) =>{
    console.log(storage.get('notes'))
    event.sender.send('recieveData', storage.get(value));
})

ipcMain.on("delete", (event, id) =>{
    console.log(id)
    let storeLevel = 'notes.' + id
    storage.delete(storeLevel)
})

ipcMain.on("clear", (event) =>{
    storage.clear()
})

ipcMain.on("alert", (event) =>{
    dialog.showErrorBox('Input Error', 'All fields are required.') 
})