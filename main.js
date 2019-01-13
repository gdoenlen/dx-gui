/*
 *  DXGUI - GUI Client for the sfdx cli
 *  Copyright (C) 2019 George Doenlen
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

function init() {
  win = new BrowserWindow({ width: 1000, height: 600 });
  win.webContents.openDevTools();
  const url = getLoadUrl();
  win.loadURL(url);
  win.on('closed', () => {
    win = null;
  });
}

function getLoadUrl() {
  return process.env.NODE_ENV !== 'development' ? url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file',
    slashes: true
  }) : 'http://localhost:3000/';
}

// https://github.com/electron/electron/blob/master/docs/api/app.md#apprequestsingleinstancelock
if (app.requestSingleInstanceLock()) {
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

  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }
  });
} else {
  app.quit();
}
