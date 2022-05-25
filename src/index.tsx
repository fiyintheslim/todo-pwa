import React from "react"
import {createRoot} from "react-dom/client"
import {ToastContainer} from "react-toastify"
import App from "./App"
import 'react-toastify/dist/ReactToastify.css';

// import registerSW from "./utilities/registerSW"



function Index() {
    return (
        <React.StrictMode>
        <App />
        <ToastContainer
                position="bottom-right"
                autoClose={3500}
                closeOnClick
                pauseOnHover
                draggable
                hideProgressBar={true}
            />
        </React.StrictMode>
    )
}

const root = createRoot(document.querySelector("#root")!)
root.render(<Index />)

// registerSW()

