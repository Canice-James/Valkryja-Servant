import axios from "axios";
import * as _ from "lodash";
const electron = window.require("electron")
const remote = require('electron').remote
var child = window.require('child_process').execFile;
var storage = require('electron-json-storage')
var CronJob = require('cron').CronJob;
import { gsap } from "gsap";


import TodoService from './../services/todos';

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

    tasksCount = TodoService.getTaskCount();
    console.log('Every day:', d);
    if (tasksCount != 0) {
      let myNotification = new Notification('*Valkryja Servant enters*', {
        body: `You have ${tasksCount} tasks due soon, master`
      })

      myNotification.onclick = () => {
        console.log('Servant Rang')
        WorkstationService.enterServant();
        callback()
        remote.getCurrentWindow().show()
      }      
    }

  }, null, true, 'America/Antigua', this, true);
  await job.start();

  const job2 = new CronJob('00 00 8-23 * * *', async ()=> {
    const d = new Date();
    
    tasksCount = TodoService.getTaskCount();

    console.log('At minute 30 past every hour from 0 through 22', d);

    if (tasksCount != 0) {
      let myNotification = new Notification('*Valkryja Servant enters*', {
        body: `You have ${tasksCount} pending tasks, master`
      })

      myNotification.onclick = () => {
        callback()
        console.log('Servant Rang')
        WorkstationService.enterServant();
        remote.getCurrentWindow().show()
      }
    }
  }, null, false, 'America/Antigua');
  await job2.start();
  

});

var enterServant = ()=>{
  let tl = gsap.timeline()
  tl.from("#wrapper", {x: 500, y: 150, ease: "elastic.out(1, 0.3)", duration: 2})
  tl.from(".speech-bubble", {opacity:0, duration: 0.5}, ">-1")
  tl.from(".servant-message", {y: 40, opacity:0, duration: 0.25}, ">-0.25")
  tl.from(".message-block", {scaleY: 0, transformOrigin: "top center", duration: 0.25}, ">-0.25")
  tl.from(".task-bubble", {x: 40, opacity:0, stagger: 0.2 },">-0.25")
}

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
  setExpression: setCurrentExpression,
  enterServant: enterServant
}

export default WorkstationService;