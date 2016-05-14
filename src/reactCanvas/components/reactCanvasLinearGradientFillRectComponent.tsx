import { ReactCanvasComponent } from './../canvasComponents'

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