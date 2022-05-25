import * as globalStyle from "../styles/app.module.scss"
import * as style from "../styles/item.module.scss"
import cross from "../images/icon-check.svg"
import {Todo} from "../utilities/types"
import {Switch} from "@headlessui/react"
import React from "react"


interface Props {
    isDark: boolean,
    complete: boolean,
    x: Function,
    id: string,
    item:Todo,
    expand:(e:React.MouseEvent, todo:Todo)=>void
}


const IndItem = ({ item, isDark, x, id, complete, expand }: Props) => {

    return (
        <li className={`${style.item} ${isDark ? globalStyle.dark : globalStyle.light}`}>
            <svg onClick={(e)=>expand(e, item)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-arrows-angle-expand ${style.expand}`} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
            </svg>
            <h3>{item.title}</h3>
            <p className={complete ? style.complete : ""}>{item.todo}</p>
            <Switch
                checked={complete}
                onChange={(e)=>x(e, id)}
                className={`${ style.complete}`}
            >{complete ?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            }</Switch>
        </li>
    )
}

export default IndItem