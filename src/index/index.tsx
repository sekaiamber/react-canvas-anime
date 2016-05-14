import * as React from "react";
import { ReactCanvas } from "./../reactCanvas/reactCanvas";
import { canvasOption } from './canvasOption';

export class Index extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <ReactCanvas {...canvasOption} />
      </div>
    );
  }
}