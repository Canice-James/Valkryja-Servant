import axios from "axios";
var _ = window.require("lodash");
const electron = window.require("electron")
const { ipcRenderer, remote } = window.require( "electron" )
var child = window.require('child_process').execFile;
var storage = window.require('electron-json-storage')

import TodoService from './../services/todos';
import WorkstationService from './../services/workstation';
const trackEvents = {
  setAnalyticsUid: 'setAnalyticsUid',
  init: 'programInit',
  start: 'programStart',
  notifOpen: 'notifOpen',
  taskLaunch: 'taskLaunch',
  workStationLaunch: 'workStationLaunch'
}

var init = async (callback) => {
  loadToken(res=>{
    let tokenLoaded = res
    if (!tokenLoaded){
      callback({status:400, error:'token'})
    }
    else if (tokenLoaded){
      callback(true)
    }
  })

  ipcRenderer.on('servant', (event, message) => {
    console.log("Sevant channel message",  message) 
    if (message == 'call') {
      WorkstationService.enterServant();
    }
  });

};

function loadToken (callback) {
  console.log(storage.getDataPath())
  WorkstationService.getTrelloToken((res=>{
    let token = res;

    if ( !_.isString(token) || _.isEmpty(token)){
      callback(false)
    }
    else {
      TodoService.setToken(token) 
      callback(true)
    }
  }));

};

var track = (trackEvent) => {
  ipcRenderer.send( trackEvent, TodoService.getToken(), TodoService.getTaskCount(), WorkstationService.getExpression())
  console.log(`track ${trackEvent}`, TodoService.getToken())
}

var openUrl = (link => {
  electron.shell.openExternal(link)
});


// var sendNotication = (tasksCount => {
//   let myNotification = new Notification('*Valkryja Servant enters*', {
//     body: `You have ${tasksCount} pending tasks, master`
//   })
//   tasksCount = 2;
//   myNotification.onclick = () => {
//     console.log('Servant Rang')
//   }
// });

var getTrelloToken = async () => {
  let res = null;
  await storage.get('TrelloToken', ((err, data)=>{
    console.log(  'token', data)
    res = data
  }))
  return res;
}


var saveTrelloToken = (token) => {
  let res = false;
  storage.set('TrelloToken', token,(err)=>{
    if (err) throw err;
    res = true;
  }); 
  return res;
}


var SystemService = {

  init:init,
  saveTrelloToken: saveTrelloToken,
  trackEvents: trackEvents,
  track, track
}

export default SystemService;