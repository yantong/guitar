<template>
  <canvas :width="width" :height="height" class="scale" ref="scale"></canvas>
</template>

<script>
export default {
  components: {},
  props: {
    seledFre: {},
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  watch: {
    seledFre(value) {
      this.draw(value);
    },
  },
  computed: {},
  methods: {
    draw(seledFre = {}) {
      let scale = this.$refs.scale;
      let ctx = scale.getContext("2d");
      let r = this.width / 2;
      let center = [r, r + 40];

      scale.width = this.width;

      ctx.translate(...center);
      ctx.rotate(Math.PI);
      for (let i = 1; i <= 180; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 10 == 0 ? "#00f" : "#00f";
        ctx.strokeStyle = i >= 80 && i <= 100 ? "#0f0" : ctx.strokeStyle;
        ctx.lineWidth = 1;
        i > 1 && ctx.rotate(Math.PI / 180);
        ctx.moveTo(r - 10, 0);
        ctx.lineTo(r - (i % 10 == 0 ? 30 : 20), 0);
        if (i >= 40 && i <= 140 && i % 2 == 0) ctx.stroke();
      }

      let { freRange, cur } = seledFre;
      let Rate;

      if (cur) {
        if (cur <= freRange[1]) {
          Rate = (cur - freRange[0]) / (freRange[1] - freRange[0]) / 2;
        } else {
          Rate = (freRange[2] - freRange[1]) / (cur - freRange[1]) / 2 + 0.5;
        }
      }

      ctx.restore();
    //   ctx.rotate(Math.PI);
      ctx.beginPath();
      ctx.strokeStyle = "#f00";
      ctx.lineWidth = 1;
      //   ctx.rotate(
      // cur ? 0 : (Math.PI * 40) / 180 + (Math.PI / 180) * parseInt(Rate * 100)
      //   );
      ctx.rotate(Math.PI / 2* 3);
      ctx.moveTo(r - 10, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      console.log(Rate);
    },
  },
  mounted() {
    this.width = this.$refs.scale.offsetWidth;
    this.height = this.$refs.scale.offsetHeight;

    this.$nextTick(() => {
      this.draw();
    });
  },
};
</script>

<style scoped>
.scale {
  width: 100%;
  max-width: 600px;
  height: 200px;
}
</style>
