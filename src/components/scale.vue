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
      preAngle: Math.PI / 2,
      drawQueue: [],
      drawing: false,
    };
  },
  watch: {
    seledFre(value) {
      this.makeDrawQueue(value);
    },
  },
  computed: {},
  methods: {
    makeDrawQueue(seledFre = {}) {
      let { freRange, cur } = seledFre;
      let count = 6;
      let angles = [];
      let Rate, angle;

      if (cur) {
        if (cur >= freRange[1]) {
          Rate = (cur - freRange[1]) / (freRange[2] - freRange[1]) / 2 + 0.5;
        } else {
          Rate = (cur - freRange[0]) / (freRange[1] - freRange[0]) / 2;
        }
      }

      if (cur) {
        angle = (Math.PI * 40) / 180 + (Math.PI / 180) * parseInt(Rate * 100);
      } else {
        angle = Math.PI / 2;
      }

      for (let index = 1; index <= count; index++) {
        let realAngle =
          this.preAngle + ((angle - this.preAngle) / count) * index;

        angles.push(realAngle);
      }

      this.preAngle = angle;
      this.drawQueue.push(...angles);

      !this.drawing && this.draw();
    },
    draw() {
      if (!(this.drawing = this.drawQueue.length)) return;

      let scale = this.$refs.scale;
      let ctx = scale.getContext("2d");
      let dpr = window.devicePixelRatio;
      let r = this.width / 2;
      let center = [r, r + 20 * dpr];
      let realAngle = this.drawQueue.shift();

      scale.width = this.width;

      ctx.restore();
      ctx.translate(...center);
      ctx.rotate(Math.PI);
      for (let i = 0; i <= 180; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 10 == 0 ? "#2D5AFA" : "#2D5AFA";
        ctx.strokeStyle = i >= 80 && i <= 100 ? "#00AB44" : ctx.strokeStyle;
        ctx.lineWidth = i % 10 == 0 ? 2 * dpr : 1 * dpr;
        ctx.lineCap = "round";
        i > 0 && ctx.rotate(Math.PI / 180);
        ctx.moveTo(r - 10, 0);
        ctx.lineTo(r - (i % 10 == 0 ? 20 * dpr : 15 * dpr), 0);
        if (i >= 40 && i <= 140 && i % 2 == 0) ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = "#EC0000";
      ctx.lineWidth = 4 * dpr;
      ctx.lineCap = "round";
      ctx.rotate(Math.PI + realAngle);
      ctx.moveTo(r - 30 * dpr, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      requestAnimationFrame(this.draw);
    },
  },
  mounted() {
    let ctx = this.$refs.scale.getContext("2d");
    let dpr = window.devicePixelRatio;
    let { width: cssWidth, height: cssHeight } =
      this.$refs.scale.getBoundingClientRect();
    this.width = dpr * cssWidth;
    this.height = dpr * cssHeight;
    ctx.scale(dpr, dpr);

    this.$nextTick(() => {
      this.makeDrawQueue();
    });
  },
};
</script>

<style scoped>
.scale {
  width: 100%;
  max-width: 600px;
  height: 140px;
  background: #e9e9e9;
  border-radius: 4px;
}

@media screen and (min-device-width: 600px) {
  .scale {
    height: 200px;
  }
}
</style>
