<template>
  <div class="wrapper">
    <scale :seledFre="seledFre"></scale>
    <span>{{ seledFre && seledFre.name }}</span>
  </div>
  <button ref="startButton" @click="start" class="start-button"></button>
</template>

<script>
import NoteAnalyzer from "./util/note-analyzer";
import FreAnalyzer from "./util/fre-analyzer";
import Scale from "./components/scale.vue";

export default {
  name: "App",
  components: { Scale },
  data() {
    return {
      noteAnalyzer: null,
      seledFre: null,
    };
  },
  mounted() {
    this.noteAnalyzer = new NoteAnalyzer({
      callback: (freq) => {
        this.seledFre = FreAnalyzer(freq);
      },
    });
    this.$refs.startButton.click();
  },
  beforeUnmount() {
    this.noteAnalyzer.stop();
  },
  methods: {
    start() {
      this.noteAnalyzer.start();
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-button {
  display: none;
}
</style>
