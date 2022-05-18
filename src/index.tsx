import React from "react"
import { render } from "react-dom"
import App from "./App"

function Index() {
    return (
        <App />
    )
}

render(<Index />, document.querySelector("#root"))