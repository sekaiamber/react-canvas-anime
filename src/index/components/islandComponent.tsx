import { ReactCanvasImageComponent } from './../../reactCanvas/canvasComponents';
import { ReactCanvas } from './../../reactCanvas/reactCanvas';
import { IslandImageSrc } from './../const';

export class IslandComponent extends ReactCanvasImageComponent {
  constructor() {
    super(
      IslandImageSrc,
      0, 0, 1920, 680, 0, 0, 1920, 680
    );
  }
}