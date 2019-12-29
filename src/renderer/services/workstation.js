import axios from "axios";
import * as _ from "lodash";
const electron = window.require("electron")
const remote = require('electron').remote
var child = window.require('child_process').execFile;
var storage = require('electron-json-storage')
var CronJob = require('cron').CronJob;

const VSCODE = 'C:\\Users\\Ecanic\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe';
const GITHUB= 'https://github.com';
const API_ENDPOINT = 'https://api.trello.com/1/';
let currentExp;

var openProgram = ((path) => {
  child(path, (err, data)=> {
    if(err){
       console.error(err);
       return;
    }
    console.log(data.toString());
  });
});

var launch = (taskUrl=> {
  console.log(this)
  openUrl(GITHUB)
  openUrl(taskUrl)
  openProgram(VSCODE)

});

var openUrl = (link => {
  electron.shell.openExternal(link)
});

var init =  ( async (tasksCount, callback) => {

  
  const job = new CronJob('00 00 10 * * 0-6', async ()=> {
    const d = new Date();
    console.log('Every day:', d);
    let myNotification = new Notification('*Valkryja Servant enters*', {
      body: `You have ${tasksCount} tasks due soon, master`
    })
    tasksCount = 2;
    myNotification.onclick = () => {
      console.log('Servant Rang')
      callback()
      remote.getCurrentWindow().show()
    }
  }, null, true, 'America/Antigua', this, true);
  await job.start();

  const job2 = new CronJob('00 30 20 * * 0-6', async ()=> {
    const d = new Date();
    console.log('Every day:', d);
    let myNotification = new Notification('*Valkryja Servant enters*', {
      body: `You have ${tasksCount} pending tasks, master`
    })
    tasksCount = 2;
    myNotification.onclick = () => {
      callback()
      console.log('Servant Rang')
      remote.getCurrentWindow().show()
    }
  }, null, false, 'America/Antigua');
  await job2.start();
  

});

var getTrelloToken = async (callback) => {
  let res = null;
  storage.get('TrelloToken', (  (err, data)=>{
    console.log(  'token', data)
    callback(data)
  }))

}


var saveTrelloToken = (token) => {
  let res = false;
  storage.set('TrelloToken', tasksCount,(err)=>{
    if (err) throw err;
    res = true;
  }); 
  return res;
}

var setCurrentExpression = (exp) => {
  currentExp = exp
}

var getCurrentExpression = () => {
  return currentExp
}

var WorkstationService = {


  launch: launch,
  openUrl: openUrl,
  openProgram: openProgram,
  init: init,
  saveTrelloToken: saveTrelloToken,
  getTrelloToken: getTrelloToken,
  getExpression: getCurrentExpression,
  setExpression: setCurrentExpression
}

export default WorkstationService;