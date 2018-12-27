<template>

  <div class="speech-bubble"> 
    <slot></slot>
  </div>

</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'message-bubble',
    props: ['msg'],
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

</style>
