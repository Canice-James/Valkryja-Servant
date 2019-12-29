<template>
  <div class="ui inverted segment">
    <div class="ui inverted accordion relaxed divided list">
  
        <!-- <div class="ui inverted segment  relaxed divided list">
        <div class="ui accordion">
          <div >
            <img class="ui avatar image" src="/images/avatar2/small/molly.png">
            <div class="title">
              <i class="dropdown icon"></i>

              <div class="header title">{{ task.name }}</div>

              Due on {{task.due}}
            </div>

            <div class="right floated content">
              <div class="mini ui button">View</div>
            </div>
          </div>
        </div>
      </div> -->

      <div v-for="(task) of list" v-bind:key="task.id" class="task-bubble">
        <div class="item title">
          
          <h3 class="header">
            <!-- <i class="dropdown icon"></i> -->
            {{ task.name }}
          </h3>
          <p>Due on {{task.due}} </p>
        </div>
        <div class=" content">
          <div class=" ">
            <button v-on:click="openTask(task.url)" class=" mini ui purple right floated button">View</button>
          </div>
          <div class="ui divider" style="margin-bottom: 2rem; border-color: transparent;"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SystemService from './../services/system';

export default {
  name: "message-list",
  props: ["list"],
  components: {},
  mounted: function() {
    $(".ui.inverted.accordion").accordion();
  },
  methods: {

    openTask(url){
      SystemService.track(SystemService.trackEvents.taskLaunch)
      this.open(url)
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};

$(".ui.accordion").accordion();
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

.speech-bubble {
  display: flex;
  position: relative;
  background: rgba(154, 154, 232, 0.53);
  border-radius: 0.4em;
  min-height: 20vh;
  height: fit-content;
  top: 22vh;
  width: 300px;
  padding: 20px;
  align-items: center;
  justify-content: center;
}

.speech-bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 33px solid transparent;
  border-left-color: rgba(154, 154, 232, 0.53);
  border-right: 0;
  border-bottom: 0;
  margin-top: -16.5px;
  margin-right: -33px;
}

.ui.inverted.segment {
  background: rgba(27, 28, 29, 0.6);
  width: 90%;
}

.task-bubble {
  margin-bottom: 0.2rem;
}

.accordion > .task-bubble {
  border: none;
}

.accordion > .task-bubble ~ .task-bubble {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.header {
  margin-bottom: 0.3rem;
}


</style>
