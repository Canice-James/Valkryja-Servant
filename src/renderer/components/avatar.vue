<template>
  <div id="wrapper">
    <main>
      <message-bubble class="ui grid"> 
        <div class="row">
          <h3>{{msg}}</h3>
        </div>
        <div class="row">
          <message-list v-bind:list="[...tasks]"></message-list>
        </div>
        
      </message-bubble>
      <img id="avatar" src="~@/assets/avatars/purple-hair/Happy.png" alt="avatar">
    </main>
  </div>
</template>

<script>
  import MessageBubble from './MessageBubble'
  import MessageList from './MessageList'

  export default {
    name: 'avatar',
    components: {MessageBubble, MessageList},
    data () {
      return {
        msg: 'Hi master!',
        tasks: [
          {
            title: 'Project 1',
            message: 'Task 1 due in 3 days',
            id: 'project1'
          },
          {
            title: 'Project 2',
            message: 'Task 1 due in 6 days',
            id: 'project2'
          }
        ]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background: none; 
   }

  #wrapper {
    background: none;
    height: 100vh;
    width: 100vw;
  }


  #avatar {
    height: 100vh;
    width: auto;
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
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }
</style>
