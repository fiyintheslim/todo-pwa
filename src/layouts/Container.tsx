import React from 'react'
import * as style from "../styles/app.module.scss"

interface Props {
    children: React.ReactNode,
    isDark: boolean
}
const Container = ({ children, isDark }: Props) => {
    return (
        <div className={`${style.container} ${isDark ? style.bgDark : style.bgLight}`}>
            {children}
        </div>
    )
}

export default Container