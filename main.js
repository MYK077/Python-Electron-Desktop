// main.js

const PY_DIST_FOLDER = 'dist'
const PY_FOLDER = 'pycalc'
const PY_MODULE = 'api'

const electron = require('electron')
require('electron-reload')(__dirname)
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')

let mainWindow = null
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      nodeIntegration: true
  }
  })
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // to open dev tools uncomment below line
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)
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

let newProcessSpinner = null
let port = null

const selectPort = () => {
  port = 4242
  return port
}

const findExecutable = () => {
  const fullPath = path.join(__dirname, PY_FOLDER, PY_DIST_FOLDER)
  return require('fs').existsSync(fullPath)
}

const getScriptPath = () => {
  if (!findExecutable()) {
    return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
  }
  if (process.platform === 'win32') {
    return path.join(__dirname, PY_FOLDER, PY_DIST_FOLDER, PY_MODULE + '.exe')
  }
  return path.join(__dirname, PY_FOLDER, PY_DIST_FOLDER, PY_MODULE)
}

const createProcessSpinner = () => {
  let script = getScriptPath()
  let port = '' + selectPort()
  if (findExecutable()) {
    newProcessSpinner = require('child_process').execFile(script, [port])
  } else {
    newProcessSpinner = require('child_process').spawn('python', [script, port])
  }
  if (newProcessSpinner != null) {
    console.log('child process success')
  }
}

const exitProcessSpinner = () => {
  newProcessSpinner.kill()
  newProcessSpinner = null
  port = null
}

app.on('ready', createProcessSpinner)
app.on('will-quit', exitProcessSpinner)
