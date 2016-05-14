import { 
  IReactCanvasComponent,
  ReactCanvasLinearGradientFillRectComponent,
} from './../reactCanvas/canvasComponents';
import { WaveComponent } from './components/waveComponent';
import { IslandComponent } from './components/islandComponent';
import { StarComponent } from './components/starComponent';
import { SprayComponent } from './components/sprayComponent';

const BackgroundComponent = new ReactCanvasLinearGradientFillRectComponent(
  {x0: 0, y0: 0, x1: 0, y1: 680},
  {x: 0, y: 0, width: 1920, height: 680},
  [0, '#72c2d2'],
  [1, '#cbecd9']
)
BackgroundComponent.zindex = -1;

// add background
const components: IReactCanvasComponent[] = [
  BackgroundComponent
];

// add star
let star = new StarComponent(25);
star.zindex = 10;
components.push(star);

// add island
let island = new IslandComponent();
island.zindex = 50;
components.push(island);

// add spray
let spray = new SprayComponent();
spray.zindex = 60;
components.push(spray);

// add wave
for (var i = 0; i < 6; i++) {
  var component = new WaveComponent(i);
  component.direction = i % 2 == 0 ? 1 : -1;
  component.zindex = 100 - i;
  components.push(component);
}

export { components };