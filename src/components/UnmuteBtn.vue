<template>
  <div>
    <div
      src="http://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg"
      alt="Mute_Icon.svg"
      title="Mute icon"
      v-if="mute"
      v-on:click="toggleMute"
    >
      <i class="fa fa-volume-off"></i>
    </div>
    <div
      src="http://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg"
      alt="Speaker_Icon.svg"
      title="Unmute/speaker icon"
      v-else
      v-on:click="toggleMute"
    >
      <i class="fa fa-volume-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnmuteBtn",
  data: function() {
    return {
      mute: true
    };
  },
  methods: {
    toggleMute() {
      this.mute = false;
    }
  }
};
</script>

<style scoped>
div {
  text-align: left;
  margin-left: 10%;
}
.fa {
  font-size: 2em;
  color: rgba(255, 255, 255, 0.5);
}
</style>