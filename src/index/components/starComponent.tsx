import { ReactCanvasImageComponent } from './../../reactCanvas/canvasComponents';
import { ReactCanvas } from './../../reactCanvas/reactCanvas';
import { StarImageSrc } from './../const';

type Star = {
  x: number,
  y: number,
  scale: number,
  alpha: number,
  shiningSpeed: number,
  shiningDirection: number,
  halo?: Halo,
};
// 光晕
type Halo = {
  alpha: number,
  alphaSpeed: number,
  radius: number,
  radiusSpeed: number,
}

export class StarComponent extends ReactCanvasImageComponent {
  constructor(
    public count: number
  ) {
    super(StarImageSrc);
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * this.options.width + this.options.x);
      let y = Math.floor(Math.random() * this.options.height + this.options.y);
      this.stars.push(this.buildStar(x, y));
    }
  }
  
  buildStar(x: number, y: number, halo?: Halo): Star {
    let ret: Star = {
      x: x,
      y: y,
      scale: Math.random() * (this.options.scale[1] - this.options.scale[0]) + this.options.scale[0],
      alpha: Math.random(),
      shiningSpeed: Math.random() * .015,
      shiningDirection: Math.random() > .5 ? 1 : -1
    }
    if (halo) {
      ret.halo = halo;
    }
    return ret;
  }
  
  draw(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];
      context.globalAlpha = star.alpha;
      context.drawImage(this.image,
        0, 0, 60, 60,
        star.x, star.y, 60 * star.scale, 60 * star.scale
      );
      // 绘制光晕
      if (star.halo) {
        let halo = star.halo;
        context.globalAlpha = 1;
        context.beginPath();
        context.strokeStyle = `rgba(255,255,255,${halo.alpha})`;
        context.lineWidth = 1;
        let radius = halo.radius * star.scale;
        let offset = 30 * star.scale;
        context.arc(star.x + offset, star.y + offset, radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        context.stroke();
        context.closePath();
      }
    }
  }
  
  update() {
    for (let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];
      star.alpha = star.alpha + star.shiningSpeed * star.shiningDirection;
      if (star.alpha > 1) {
        star.alpha = 1;
        star.shiningDirection = -1
      } else if (star.alpha < 0) {
        star.alpha = 0;
        star.shiningDirection = 1
      }
      // 光晕控制
      if (star.halo) {
        let halo = star.halo;
        halo.alpha -= halo.alphaSpeed;
        halo.radius += halo.radiusSpeed;
        if (halo.alpha < 0) {
          delete star.halo;
        }
      }
    }
  }
  
  onClick(e: MouseEvent, canvas: ReactCanvas) {
    let x = e.pageX - canvas.dom.offsetLeft;
    let y = e.pageY - canvas.dom.offsetTop;
    if (
      (x < this.options.x) ||
      (x > this.options.x + this.options.width) ||
      (y < this.options.y) ||
      (y > this.options.y + this.options.height)
    ) {
      return;
    }
    let star = this.buildStar(x, y, {
      alpha: 1,
      alphaSpeed: .025,
      radius: 10,
      radiusSpeed: 1
    });
    star.alpha = 1;
    star.shiningDirection = -1;
    star.x -= star.scale * 30;
    star.y -= star.scale * 30;
    this.stars.push(star);
  }
  
  options = {
    scale: [.1, .4],
    x: 0,
    y: 0,
    width: 1920,
    height: 520,
  }
  
  stars: Star[] = [];
}