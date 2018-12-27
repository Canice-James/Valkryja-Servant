<template>

  <div class="ui inverted segment">
    <div class="ui inverted relaxed divided list">
      {{tasks}}
      <div v-for="(task) of list" v-bind:key="task.id" class="item">
        <div class="content">
          <!-- <img class="ui avatar image" src="/images/avatar2/small/molly.png"> -->
          <div class="header">{{ task.title }}</div>
          {{task.message}}
          
          <div class="right floated content">
            <div class="ui button">View</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'message-list',
    props: ['list'],
    components: {},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  .speech-bubble {
    display: flex;
    position: relative;
    background: rgba(154, 154, 232, 0.53);
    border-radius: .4em;
    min-height: 20vh;
    height: fit-content;
    top: 22vh;
    width: 300px;
    padding: 20px;
    align-items: center;
    justify-content: center;   
  }

  .speech-bubble:after {
    content: '';
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

</style>
