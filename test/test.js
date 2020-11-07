const Application = require('spectron').Application
const path = require('path')
const assert = require('assert')
const { app } = require('electron')

const baseDir = path.join(__dirname,'..')
const electronBinary = path.join(baseDir,'node_modules','.bin','electron')
// const app = new Application({
//     path: electronBinary,
//     args: [baseDir]
//   })

describe('Application launch', function () {
    this.timeout(10000)
beforeEach(function () {
    this.app = new Application({
      path: `${baseDir}/addition-application-win32-x64/addition-application.exe`,
      args: [baseDir],
      chromeDriverLogPath: `../chromedriverlog.txt`,
      "windowTypes": [ "app" ]
      //chromeDriverArgs: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    })
    return this.app.start()
  })

afterEach(function () {
    if (this.app && this.app.isRunning()) {
      console.log("closing window now")
      return this.app.stop()
    }
  })
  
  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.strictEqual(count, 1)
    })
  });
  it('tests the title', function(){
    return this.app.client.waitUntilWindowLoaded().getTitle()
    .then((title) => {
      assert.strictEqual(title, 'we want to help you')
    })
  });
  it('should check addition function', function(){
    const loadWindow = this.app.client.waitUntilWindowLoaded()
    return loadWindow.getHTML('#input1')
    .then(()=>{
      this.app.client.setValue('#input1',2)
       loadWindow.getHTML('#input2')
    })
     .then(() => {
      this.app.client.setValue('#input2',2)
       loadWindow.getHTML('#btn')
     })
     .then(() => {
      this.app.client.click('#btn')
       loadWindow.getHTML('#result')
     })
     .then(() => {
      this.app.client.getValue('#result')
      .then((val) =>{
        assert.strictEqual(val, 4)
      })
     }).catch((e)=>{
       console.log(e)
     })
  })
})









// app.start().then(function () {
//   // Check if the window is visible
//    app.browserWindow.isVisible()
// }).then(function (isVisible) {
//   // Verify the window is visible
//   assert.strictEqual(isVisible, true)
// }).then(async function () {
//   // Get the window's title
//   await app.client.waitUntilWindowLoaded()
//   return app.client.getTitle()
// }).then(function (title) {
//   // Verify the window's title
//   assert.strictEqual(title, 'we want to help you')
// }).then(function () {
//   // Stop the application
//   return app.stop()
// }).catch(function (error) {
//   // Log any failures
//   console.error('Test failed', error.message)
// })


