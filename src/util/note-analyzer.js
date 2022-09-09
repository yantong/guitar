import Pitchfinder from "pitchfinder";
import { throttle } from "./util";

export default class Analyzer {
  constructor(config) {
    let { callback } = config;

    this.callback = callback;
    this.context = null;
    this.recorder = null;
    this.stream = null;
    this.audioInput = null;
  }

  start() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        const inputChannels = 1;
        const outputChannels = 1;
        const bufferSize = 4096;
        const detectPitch = new Pitchfinder.AMDF({
          maxFrequency: 800,
          minFrequency: 10,
        });

        this.stream = stream;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.recorder = this.context.createScriptProcessor(
          bufferSize,
          inputChannels,
          outputChannels
        );
        this.audioInput = this.context.createMediaStreamSource(stream);

        this.recorder.connect(this.context.destination);
        this.audioInput.connect(this.recorder);
        this.recorder.onaudioprocess = throttle((e) => {
          const pitch = detectPitch(
            new Float32Array(e.inputBuffer.getChannelData(0).buffer)
          );
          if (pitch) {
            const freq = pitch * 1.09;

            this.callback(freq);
          }
        }, 100);
      });
  }

  stop() {
    this.audioInput.disconnect();
    this.recorder.disconnect();
    this.context.close();
    this.stream.getTracks()[0].stop();
  }
}
