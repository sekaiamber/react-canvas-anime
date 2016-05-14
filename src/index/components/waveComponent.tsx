import { ReactCanvasImageComponent } from './../../reactCanvas/canvasComponents';
import { ReactCanvas } from './../../reactCanvas/reactCanvas';
import { WaveImageSrc } from './../const';

export class WaveComponent extends ReactCanvasImageComponent {
  constructor(index: number) {
    super(
      WaveImageSrc,
      0, 680 * index, 1920, 680, 0, 0, 1920, 680
    );
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image,
      this.offsetX,
      this.offsetY,
      this.width,
      this.height,
      this.canvasOffsetX + this.transform.position.x,
      this.canvasOffsetY + this.transform.position.y,
      this.canvasImageWidth,
      this.canvasImageHeight
    );
    if (this.direction == 1) {
      context.drawImage(this.image,
        this.offsetX,
        this.offsetY,
        this.width,
        this.height,
        this.canvasOffsetX + this.transform.position.x - 1920,
        this.canvasOffsetY + this.transform.position.y,
        this.canvasImageWidth,
        this.canvasImageHeight
      );
    } else {
      context.drawImage(this.image,
        this.offsetX,
        this.offsetY,
        this.width,
        this.height,
        this.canvasOffsetX + this.transform.position.x + 1920,
        this.canvasOffsetY + this.transform.position.y,
        this.canvasImageWidth,
        this.canvasImageHeight
      );
    }
    
  }
  
  update(canvas: ReactCanvas) {
    this.transform.position.x += this.speed.x * this.direction;
    if (this.transform.position.x > 1920) {
      this.transform.position.x = 0;
    }
    if (this.transform.position.x < -1920) {
      this.transform.position.x = 0
    }
  }
  
  transform = {
    position: {
      x: 0,
      y: 0
    }
  }
  direction = 1;
  speed = {
    x: 1,
    y: 1
  };
  
}