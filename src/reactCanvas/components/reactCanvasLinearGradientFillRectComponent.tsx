import { ReactCanvasComponent } from './../canvasComponents'
import { ReactCanvas } from './../reactCanvas';
const Utils = ReactCanvas.Utils;

interface Linear {
   x0: number, y0: number, x1: number, y1: number
}
interface Rect {
  x: number, y: number, width: number, height: number
}

type Color = [number, string];

export class ReactCanvasLinearGradientFillRectComponent extends ReactCanvasComponent {
  constructor(
    public linear: Linear = { x0: 0, y0: 0, x1: 0, y1: 0 },
    public rect: Rect = { x: 0, y: 0, width: 0, height: 0 },
    ...colors: Color[]
  ) {
    super();
    this.colors = colors;
    
    this.linear = {
      x0: Utils.round(this.linear.x0),
      y0: Utils.round(this.linear.y0),
      x1: Utils.round(this.linear.x1),
      y1: Utils.round(this.linear.y1)
    }
    this.rect = {
      x: Utils.round(this.rect.x),
      y: Utils.round(this.rect.y),
      width: Utils.round(this.rect.width),
      height: Utils.round(this.rect.height)
    }
    for (let i = 0; i < this.colors.length; i++) {
      let color = this.colors[i];
      color[0] = Utils.round(color[0]);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    let gr = context.createLinearGradient(this.linear.x0, this.linear.y0, this.linear.x1, this.linear.y1);
    for (let i = 0; i < this.colors.length; i++) {
      let color = this.colors[i];
      gr.addColorStop(color[0], color[1]);
    }
    context.fillStyle = gr;
    context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }
  
  colors: [number, string][];
  loaded = true;
}