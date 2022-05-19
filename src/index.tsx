import React from "react"
import { render } from "react-dom"
import App from "./App"
import registerSW from "./utilities/registerServiceWorker"

function Index() {
    return (
        <App />
    )
}

render(<Index />, document.querySelector("#root"))

registerSW()