'use strict'

import { app, BrowserWindow, electron, nativeImage, screen,  Menu, Tray, ipcMain } from 'electron'
var Positioner = require('electron-positioner')
var upath = require('upath')
var storage = require('electron-json-storage')
const os = require('os');
const path = require('path');

var Analytics = require('analytics-node');
var analytics = new Analytics('BpagBf5LpqOQ1h4Ez39uXBitXIYIl7OW');
var ip = require('ip');
var deviceIp = ip.address()

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

app.setAppUserModelId(process.execPath)

let mainWindow
let tray = null

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`


const dataPath = storage.getDataPath();

const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})

ipcMain.on( "setAnalyticsUid", ( event, uid ) => {
  analytics.identify({
    userId: uid,
  }, {context: { ip: deviceIp }});
} );

ipcMain.on( "programInit", ( event, uid ) => {
  analytics.track({
    userId: uid,
    event: 'init',
    properties: {
    },
    context: { ip: deviceIp },
  });
} );

ipcMain.on( "programStart", ( event, uid, taskCount, expression ) => {
  console.log('device',deviceIp)
  analytics.track({
    userId: uid,
    event: 'started',
    properties: {
      tasks: taskCount,
      expression: expression,
    },
    context: { ip: deviceIp },
  });
} );

ipcMain.on( "notifOpen", ( event, uid, taskCount, ) => {
  analytics.track({
    userId: uid,
    event: 'Notification Click',
    properties: {
      taskCount: taskCount
    },
    context: { ip: deviceIp },
  });
} );

ipcMain.on( "taskLaunch", ( event, uid, taskCount, expression ) => {
  analytics.track({
    userId: uid,
    event: 'Task Launched',
    properties: {
      tasks: taskCount,
      expression: expression
    },
    context: { ip: deviceIp },
  });
} );

ipcMain.on( "workStationLaunch", ( event,  uid, taskCount, expression ) => {
  analytics.track({
    userId: uid,
    event: 'Workstation Launched',
    properties: {
      tasks: taskCount,
      expression: expression
    },
    context: { ip: deviceIp },
  });
})



function createWindow () {
  /**
   * Initial window options
   */
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;


  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
    transparent:true,
    frame: false
  })

  var positioner = new Positioner(mainWindow)
  positioner.move('bottomRight')


  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  let icon = nativeImage.createFromPath('build/icons/256x256.png')
  console.log(icon)
  tray = new Tray( icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

app.on('ready', async ()=>{
  createWindow()
  createTray()

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
