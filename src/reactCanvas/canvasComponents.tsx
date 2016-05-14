import { ReactCanvas } from './reactCanvas';

export interface IReactCanvasComponent {
  // attributes
  loaded: boolean;
  zindex: number;
  // functions
  update(canvas: ReactCanvas): void;
  draw(context: CanvasRenderingContext2D, canvas: ReactCanvas): void;
  // event
  onLoaded(callback: () => void): void;
  onClick?(e: MouseEvent, canvas: ReactCanvas): void;
}

export class ReactCanvasComponent implements IReactCanvasComponent {
  loaded = false;
  zindex = 0;
  update(canvas: ReactCanvas) {}
  draw(context: CanvasRenderingContext2D, canvas: ReactCanvas) {}
  
  _loaded: () => void;
  
  onLoaded(callback: () => void) {
    if (this.loaded) {
      callback();
    } else {
      this._loaded = callback;
    }
  }
}

import { ReactCanvasLinearGradientFillRectComponent } from './components/reactCanvasLinearGradientFillRectComponent'
import { ReactCanvasImageComponent } from './components/reactCanvasImageComponent'

export {
  ReactCanvasLinearGradientFillRectComponent,
  ReactCanvasImageComponent
}