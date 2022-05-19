import React from 'react'

import * as style from "../styles/header.module.scss"
import light from "../images/icon-moon.svg"
import dark from "../images/icon-sun.svg"



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