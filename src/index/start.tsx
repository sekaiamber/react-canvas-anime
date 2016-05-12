import * as React from "react";
import * as ReactDOM from "react-dom";

import { Index } from "./index";

ReactDOM.render(
    <Index compiler="TypeScript" framework="React" />,
    document.getElementById("main")
);