import { ReactCanvasImageComponent } from './../../reactCanvas/canvasComponents';
import { ReactCanvas } from './../../reactCanvas/reactCanvas';
import { CloudImageSrc } from './../const';

type Cloud = {
  x: number,
  y: number,
  alpha: number,
  width?: number,
  height?: number,
  scale: number,
  zindex: number,
  speed: number,
}

export class CloudComponent extends ReactCanvasImageComponent {
  constructor(
    public count: number
  ) {
    super(
      CloudImageSrc
    );
    for (let i = 0; i < count; i++) {
      this.clouds.push(this.buildCloud(i, count));
    }
  }
  
  buildCloud(index: number, count: number): Cloud {
    let interval = this.options.width / count;
    let ret: Cloud = {
      x: Math.floor(Math.random() * interval + index * interval),
      y: Math.floor(Math.random() * this.options.height + this.options.y),
      alpha: 1,
      scale: Math.random() * (this.options.scale[1] - this.options.scale[0]) + this.options.scale[0],
      zindex: Math.random(),
      speed: 1
    }
    // 313 x 119
    ret.width = Math.floor(313 * ret.scale);
    ret.height = Math.floor(119 * ret.scale);
    ret.speed = ret.zindex * (this.options.speed[1] - this.options.speed[0]) + this.options.speed[0];
    ret.alpha = ret.zindex * (this.options.alpha[1] - this.options.alpha[0]) + this.options.alpha[0];
    return ret;
  }
  
  draw(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.clouds.length; i++) {
      let cloud = this.clouds[i];
      context.globalAlpha = cloud.alpha;
      context.drawImage(this.image,
        0, 0, 313, 119,
        cloud.x, cloud.y, cloud.width, cloud.height
      );
    }
  }
  
  update() {
    for (let i = 0; i < this.clouds.length; i++) {
      let cloud = this.clouds[i];
      cloud.x += cloud.speed;
      if (cloud.x > this.options.width) {
        cloud.x = this.options.x - cloud.width - 1;
        cloud.y = Math.floor(Math.random() * this.options.height + this.options.y);
      }
    }
  }
  
  options = {
    scale: [.3, .8],
    speed: [.1, .5],
    alpha: [.3, 1],
    x: 0,
    y: 0,
    width: 1920,
    height: 400,
  }
  
  clouds: Cloud[] = []
}