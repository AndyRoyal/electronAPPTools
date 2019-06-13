const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url  = require('url');
const fs   = require('fs');

let logo = path.join(__dirname, 'assets/img/logo.png');
let win  = null;

let willClose = false;

function createWindow () {
    win = new BrowserWindow({
        width        : 900,
        height       : 572,
        title        : 'nutui-cli',
        center       : true,
        resizable    : false,
        icon         : logo,
        titleBarStyle: 'hidden',
 
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/tools/index.html'),
        protocol: 'file:',
        slashes : true
    }));

    // 打开开发者工具。
     //win.webContents.openDevTools();

    // 当 window 被关闭，这个事件会被触发。
    win.on('close', (event) => {
        if (process.platform !== 'win32' && !willClose) {
            win.hide();
            event.preventDefault();
        }
    });
    win.on('closed', () => {
        win = null;
    });
}


app.on('ready', () => {
    createWindow();
  
});

app.on('activate', () => {
    if (win == null) {
        createWindow();
    } else {
        win.show();
    }
});
app.on('before-quit', function () {
    willClose = true;
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});