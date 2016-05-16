import { ReactCanvasComponent } from './../canvasComponents'
import { ReactCanvas } from './../reactCanvas';
const Utils = ReactCanvas.Utils;

export class ReactCanvasImageComponent extends ReactCanvasComponent {
  constructor(
    public source: string,
    public offsetX?: number,
    public offsetY?: number,
    public width?: number,
    public height?: number,
    public canvasOffsetX?: number,
    public canvasOffsetY?: number,
    public canvasImageWidth?: number,
    public canvasImageHeight?: number
  ) {
    super();
    this.image = new Image();
    this.image.src = this.source;
    let self = this;
    this.image.addEventListener('load', function () {
      self.loaded = true;
      if (self._loaded) {
        self._loaded();
      }
    }, false);
    this.drawMode = 0;
    if (offsetX != undefined) {
      this.drawMode = 1;
      this.offsetX = Utils.round(this.offsetX);
      this.offsetY = Utils.round(this.offsetY);
    }
    if (width != undefined) {
      this.drawMode = 2;
      this.width = Utils.round(this.width);
      this.height = Utils.round(this.height);
    }
    if (canvasOffsetX != undefined) {
      this.drawMode = 3;
      this.canvasOffsetX = Utils.round(this.canvasOffsetX);
      this.canvasOffsetY = Utils.round(this.canvasOffsetY);
      this.canvasImageWidth = Utils.round(this.canvasImageWidth);
      this.canvasImageHeight = Utils.round(this.canvasImageHeight);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    switch (this.drawMode) {
      case 1:
        context.drawImage(this.image,
          this.offsetX,
          this.offsetY
        );
        break;
      case 2:
        context.drawImage(this.image,
          this.offsetX,
          this.offsetY,
          this.width,
          this.height
        );
        break;
      case 3:
        context.drawImage(this.image,
          this.offsetX,
          this.offsetY,
          this.width,
          this.height,
          this.canvasOffsetX,
          this.canvasOffsetY,
          this.canvasImageWidth,
          this.canvasImageHeight
        );
        break;
      default:
        break;
    }
  }

  image: HTMLImageElement;
  drawMode: number;
}