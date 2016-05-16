import * as React from "react";
import * as ReactDOM from "react-dom";
import { IReactCanvasComponent } from  './canvasComponents';
import "./../utils/hidpi-canvas";
import { CanvasUtils } from './canvasUtils';

export interface IReactCanvasProps {
  // data
  width?: number;
  height?: number;
  style?: {};
  components: IReactCanvasComponent[];
}

interface IReactCanvasState {
  loading?: boolean;
  keepRendering?: boolean;
}

export class ReactCanvas extends React.Component<IReactCanvasProps, IReactCanvasState> {
  dom: HTMLCanvasElement;
  back_dom: HTMLCanvasElement;
  drawList: IReactCanvasComponent[] = [];
  context: CanvasRenderingContext2D;
  back_context: CanvasRenderingContext2D;
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
    this.back_dom = document.createElement("canvas");
    this.back_dom.width = this.props.width;
    this.back_dom.height = this.props.height;
    this.back_context = this.back_dom.getContext('2d');
    
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
      let context = self.back_context;
      drawList.length = 0;
      for (var key in self.props.components) {
        if (self.props.components.hasOwnProperty(key)) {
          drawList[drawList.length] = self.props.components[key];
        }
      }
      context.clearRect(0, 0, self.dom.width, self.dom.height);
      drawList.sort((a, b) => a.zindex - b.zindex);
      for (var i = 0; i < drawList.length; i++) {
        context.save();
        drawList[i].draw(context, self);
        context.restore();
      }
      self.context.drawImage(self.back_dom, 0, 0);
    })();
  }
  // event
  handleClick(e: MouseEvent) {
    let list: IReactCanvasComponent[] = [];
    for (var key in this.props.components) {
      if (this.props.components.hasOwnProperty(key)) {
        list[list.length] = this.props.components[key];
      }
    }
    list.sort((a, b) => b.zindex - a.zindex);
    for (var i = 0; i < list.length; i++) {
      var component = list[i];
      if (component.onClick) {
        if (component.onClick(e, this) == false) {
          break;
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
  static Utils = CanvasUtils
}