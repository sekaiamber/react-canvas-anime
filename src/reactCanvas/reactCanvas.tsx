import * as React from "react";
import * as ReactDOM from "react-dom";
import { IReactCanvasComponent } from  './canvasComponents';
import "./../utils/hidpi-canvas";

export interface IReactCanvasProps {
  // data
  width?: string | number;
  height?: string | number;
  style?: {};
  components: IReactCanvasComponent[];
}

interface IReactCanvasState {
  loading?: boolean;
  keepRendering?: boolean;
}

export class ReactCanvas extends React.Component<IReactCanvasProps, IReactCanvasState> {
  dom: HTMLCanvasElement;
  drawList: IReactCanvasComponent[] = [];
  context: CanvasRenderingContext2D;
  constructor(props: IReactCanvasProps, context?: any) {
    super(props, context);
    this.state = { 
      loading: true,
    };
  }
  // lifecycle
  componentWillMount() {
    let self = this;
    for (var key in this.props.components) {
      if (this.props.components.hasOwnProperty(key)) {
        var component = this.props.components[key];
        component.onLoaded(() => {
          let loaded = true;
          for (var l in self.props.components) {
            if (self.props.components.hasOwnProperty(l)) {
              var component = self.props.components[l];
              loaded = loaded && component.loaded;
            }
          }
          self.setState({
            loading: !loaded
          })
        });
      }
    }
  }
  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this.refs['dom']) as HTMLCanvasElement;
    this.context = this.dom.getContext('2d') as CanvasRenderingContext2D;
    var self = this;
    (function renderLoop() {
      window.requestAnimationFrame(renderLoop);
      if (self.state.loading) {
        return;
      }
      for (var key in self.props.components) {
        if (self.props.components.hasOwnProperty(key)) {
          var component = self.props.components[key];
          component.update(self);
        }
      }
      let drawList = self.drawList;
      let context = self.context;
      drawList.length = 0;
      for (var key in self.props.components) {
        if (self.props.components.hasOwnProperty(key)) {
          drawList[drawList.length] = self.props.components[key];
        }
      }
      drawList.sort((a, b) => a.zindex - b.zindex);
      for (var i = 0; i < drawList.length; i++) {
        context.save();
        drawList[i].draw(self.context, self);
        context.restore();
      }
    })();
  }
  // event
  handleClick(e: MouseEvent) {
    for (var key in this.props.components) {
      if (this.props.components.hasOwnProperty(key)) {
        var component = this.props.components[key];
        if (component.onClick) {
          component.onClick(e, this);
        }
      }
    }
  }
  render() {
    let canvasOne = {
      width: this.props.width || 320,
      height: this.props.height || 640,
      style: this.props.style || {},
    }
    return (
      <div className="canvas-app">
        <canvas ref="dom" {...canvasOne} onClick={this.handleClick.bind(this)}>
          Your browser does not support HTML5 Canvas
        </canvas>
      </div>
    );
  }
}