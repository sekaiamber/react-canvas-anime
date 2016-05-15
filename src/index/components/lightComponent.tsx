import { ReactCanvasImageComponent } from './../../reactCanvas/canvasComponents';
import { ReactCanvas } from './../../reactCanvas/reactCanvas';
import { LightImageSrc } from './../const';

type Frame = {
  alpha: number,
  duration: number
}

export class LightComponent extends ReactCanvasImageComponent {
  constructor() {
    // 317 × 66
    super(
      LightImageSrc
    );
    // 设置xya
    let self = this;
    function stateLoop(current: number) {
      // 设置动画起点
      let currentFrame = self.frames[current];
      self.alpha = currentFrame.alpha;
      // 设置目标关键帧
      setTimeout(() => {
        stateLoop((current + 1) % self.frames.length);
      }, currentFrame.duration)
    }
    stateLoop(0);
  }
  
  draw(context: CanvasRenderingContext2D) {
    if (this.open) {
      context.globalAlpha = this.alpha;
      context.drawImage(
        this.image,
        0, 0, 317, 66, this.x, this.y, 317, 66
      )
    }
  }
  
  onClick(e: MouseEvent, canvas: ReactCanvas) {
    let x = e.pageX - canvas.dom.offsetLeft;
    let y = e.pageY - canvas.dom.offsetTop;
    if (
      (x < this.x) ||
      (x > this.x + 39) ||
      (y < this.y) ||
      (y > this.y + 39)
    ) {
      return;
    }
    this.open = !this.open;
    return false;
  }
  
  frames: Frame[]= [{
    alpha: 1,
    duration: 7000,
  }, {
    alpha: .5,
    duration: 300
  }, {
    alpha: .8,
    duration: 100,
  }, {
    alpha: .6,
    duration: 100,
  }, {
    alpha: .9,
    duration: 100,
  }, {
    alpha: .7,
    duration: 100,
  }, {
    alpha: 1,
    duration: 100,
  }]

  x = 229
  y = 123
  alpha = 1
  open = true
}