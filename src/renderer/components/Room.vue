<template>
  <div id="wrapper">
    <main>
      <message-bubble v-if="loaded" class="ui grid" style="padding-top: 1rem;">
        <div class="ui center aligned container">
          <h3>{{msg}}</h3>
        </div>
        <div class="row">
          <message-list v-bind:list="[...tasks]"></message-list>
        </div>
      </message-bubble>

      <message-bubble v-if="onboard" class="ui grid" style="padding-top: 1rem;">
        <div class="ui center aligned container" style="margin-bottom: 1rem;">
          <h3 style="color: black;">Welcome, enter your Trello Token to activate my service.</h3>
          <div class="ui action input">
            <input v-model="token" type="text" placeholder="Trello Token..." />
            <button @click="saveToken()" class="ui purple button">Activate</button>
          </div>
        </div>
      </message-bubble>
      <avatar :task-count="tasks.length"></avatar>
    </main>

    <div class="ui avatar popup" data-position="top left">
      <h3>Let's get started!</h3>
      <div v-if="loaded">
        <button
          v-on:click="launchStation(tasks[0].url)"
          class="mini ui purple right floated button"
        >Launch Workstation!</button>
        <button class="mini ui right floated button">Snoose</button>
      </div>
    </div>
  </div>
</template>

<script>
  import MessageBubble from './MessageBubble'
  import MessageList from './MessageList'
  import Avatar from './Avatar'

  import TodoService from './../services/todos';
  import WorkstationService from './../services/workstation';
  import SystemService from './../services/system';

  var CronJob = require('cron').CronJob;


  export default {
    name: 'room',
    components: {MessageBubble, MessageList, Avatar},
    data () {
      return {
        msg: '',
        tasks: [],
        api: '',
        token: null,
        onboard: false,
        loaded: false,
        workstationInit: false
      }
    },
    mounted () {
      $('.avatar-frame').popup({
        popup: '.avatar.popup',
        delay: {
          show: 0,
          hide: 1000
        }
      })
      $('.button')
        .popup({
          inline: true
        })
    },
    async created () {

     this.init()


    },
    methods: {

      init () {
        this.loadSys(async res=>{
          let init = res
          if (init == true) {
            await this.fetch();
          }        
        })
      },
      
      loadSys (callback) {
         SystemService.init((res)=>{
          let init = res
          // console.log('init', init)
          if (init != true) {
            if (init.error =='token') {
              this.onboard = true
              this.tasks = [];
              callback(false)
            }
          }
          else if (init == true){
            this.onboard = false
            this.loaded = true
            callback(true)
          }
        });

      },

      async saveToken () {
        let res = await SystemService.saveTrelloToken(this.token);
        this.init()
      },

      async fetch () {
        const job = new CronJob('0 */1 * * * *', async ()=> {
          const d = new Date();
          console.log('Every Tenth Minute:', d, data);
          const data = await TodoService.getTodayTodos();
          
          this.tasks = await data;
          TodoService.setTaskCount(this.tasks.length)
          this.initWorkstation()
          SystemService.track(SystemService.trackEvents.start)

          
          this.msg = `Hi master! There's ${this.tasks.length} tasks this week`;
        }, null, true, 'America/Antigua', this, true);
        await job.start();
      },
      initWorkstation () {
        if (!this.workstationInit) {
          WorkstationService.init(this.tasks.length, ()=>{
            SystemService.track(SystemService.trackEvents.notifOpen)
          })
          this.workstationInit = true
        }
      },
    
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      launchStation(taskUrl){
        SystemService.track(SystemService.trackEvents.workStationLaunch)
        WorkstationService.launch(taskUrl);
      }
    }
  }


</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  background: none;
}

#wrapper {
  background: none;
  height: 100vh;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
  float: right;
  max-height: 564px;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}
</style>
