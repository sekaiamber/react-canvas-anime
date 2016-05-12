import * as React from "react";

export interface IndexProps { compiler: string; framework: string; }

export class Index extends React.Component<IndexProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}