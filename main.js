const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

function init() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(getLoadUrl());
  win.on('closed', () => {
    win = null;
  });
}

function getLoadUrl() {
  return process.env.NODE_ENV === 'production' ? url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  }) : 'http://localhost:3000/';
}

app.on('ready', init);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (process.platform === 'darwin' && win === null) {
    init();
  }
});

//starting in version 45 all --json output, including err will go to stdout
process.env.SFDX_JSON_TO_STDOUT = true;
