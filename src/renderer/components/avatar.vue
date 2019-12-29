<template>
  <div class="avatar-frame" data-offset="0px">
    <img id="avatar" :src="loadAvatar" alt="avatar" />
  </div>
  <!-- ~@/assets/avatars/purple-hair/Happy.png -->
</template>

<script>
import WorkstationService from './../services/workstation';

export default {
  name: "avatar",
  components: {},
  props: ["taskCount"],
  data() {
    return {
      mood: 0,
      moodModify: 0,
      expressions: ['Flirty', 'Smile', 'Happy', 'Concerned', 'Confused', 'Shock', 'Sad', 'Angry'],
      expressionImages: [
        require("./../assets/avatars/purple-hair/Flirty.png"),
        require("./../assets/avatars/purple-hair/Smile.png"),
        require("./../assets/avatars/purple-hair/Happy.png"),
        require("./../assets/avatars/purple-hair/Concerned.png"),
        require("./../assets/avatars/purple-hair/Confused.png"),
        require("./../assets/avatars/purple-hair/Shock.png"),
        require("./../assets/avatars/purple-hair/Sad.png"),
        require("./../assets/avatars/purple-hair/Angry.png")
      ]
    };
  },
  mounted() {
    $("#avatar").hover(
      () => {
        this.moodModify--;
      },
      () => {
        this.moodModify++;
      }
    );
  },
  async created() {},
  methods: {
    setExpression() {},

    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  computed: {
    loadAvatar() {
      // console.log(this.mood+this.taskCount+this.moodModify);
      if (this.taskCount == 0 || this.taskCount == null) 
        this.mood = 2
      else
        this.mood = 0
      let expIndex = this.mood+this.taskCount+this.moodModify;
      let exp = this.expressions[expIndex];
      WorkstationService.setExpression(exp)
      return this.expressionImages[expIndex]
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

.avatar-frame {
  /* position: relative; */
}

#avatar {
  height: 100vh;
  width: auto;
}

.avatar.popup.center {
  /* width: 300rem !important;
    -webkit-transform-origin: right 50%; */
  /* transform-origin: right 50%; */
  /* position: relative; */
  top: 25% !important;
  right: 250px !important;
  /* position: inherit; */
  /* width: fit-content; */
}
</style>
