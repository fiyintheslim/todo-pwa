import React from 'react'
import { Logo, Switch, Top } from "../styles/styles"
import * as style from "../styles/header.module.scss"

const light = "";
const dark = "";

interface Props {
    isDark: boolean,
    setDark: React.Dispatch<React.SetStateAction<boolean>>
}

const Head = ({ isDark, setDark }: Props) => {
    return (
        <div className={style.top}>
            <h3 className={style.logo} >todo</h3>
            <img className={style.switch} onClick={() => setDark(!isDark)} src={isDark ? light : dark} />
        </div>
    )
}

export default Head