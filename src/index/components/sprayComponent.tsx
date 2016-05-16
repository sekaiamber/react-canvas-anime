import { ReactCanvasImageComponent } from './../../reactCanvas/canvasComponents';
import { ReactCanvas } from './../../reactCanvas/reactCanvas';
import { SprayImageSrc } from './../const';
const Utils = ReactCanvas.Utils;

type Frame = {
  from: {
    x: number,
    y: number,
    alpha: number,
  }
  to: {
    x: number,
    y: number,
    alpha: number,
  }
  duration: number,
  speed?: {
    x: number,
    y: number,
    alpha: number,
  }
}

export class SprayComponent extends ReactCanvasImageComponent {
  constructor() {
    super(SprayImageSrc);
    // 为关键帧增加speed
    for (let i = 0; i < this.frames.length; i++) {
      let frame = this.frames[i];
      frame.speed = {
        x: (frame.to.x - frame.from.x) / (frame.duration / 1000 * 60),
        y: (frame.to.y - frame.from.y) / (frame.duration / 1000 * 60),
        alpha: (frame.to.alpha - frame.from.alpha) / (frame.duration / 1000 * 60),
      }
    }
    // 设置xya
    let self = this;
    function stateLoop(current: number) {
      // 设置动画起点
      let currentFrame = self.frames[current];
      self.currentFrame = currentFrame;
      self.x = currentFrame.from.x;
      self.y = currentFrame.from.y;
      self.alpha = currentFrame.from.alpha;
      // 设置目标关键帧
      setTimeout(() => {
        stateLoop((current + 1) % self.frames.length);
      }, currentFrame.duration)
    }
    stateLoop(2);
  }
  
  draw(context: CanvasRenderingContext2D) {
    if (this.alpha != 0) {
      context.globalAlpha = this.alpha;
      context.drawImage(this.image,
        this.currentFrame.speed.x < .25 ? this.x : Utils.round(this.x),
        this.currentFrame.speed.y < .25 ? this.y : Utils.round(this.y),
        123, 136);
    }
  }
  
  update() {
    this.x += this.currentFrame.speed.x;
    this.y += this.currentFrame.speed.y;
    this.alpha += this.currentFrame.speed.alpha;
    if (this.alpha < 0) {
      this.alpha = 0;
    } else if (this.alpha > 1) {
      this.alpha = 1;
    }
  }
  
  frames: Frame[]= [{
    from: {
      x: 490,
      y: 440,
      alpha: 0,
    },
    to: {
      x: 440,
      y: 380,
      alpha: 1,
    },
    duration: 300
  }, {
    from: {
      x: 440,
      y: 380,
      alpha: 1,
    },
    to: {
      x: 440,
      y: 400,
      alpha: 0,
    },
    duration: 1000,
  }, {
    from: {
      x: 490,
      y: 440,
      alpha: 0,
    },
    to: {
      x: 490,
      y: 440,
      alpha: 0,
    },
    duration: 10000,
  }]
  currentFrame: Frame
  x: number
  y: number
  alpha: number
}