import * as style from "../styles/app.module.scss"
import cross from "../images/icon-check.svg"

interface Props {
    children: React.ReactNode,
    isDark: boolean,
    complete: boolean,
    x: Function,
    id: string
}

const IndItem = ({ children, isDark, x, id, complete }: Props) => {

    return (
        <li className={`${style.item} ${isDark ? style.dark : style.light}`}>
            <p className={complete ? style.complete : ""}>{children}</p>

            <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => x(e, id)} width="11" height="9">
                <path fill="none" stroke={isDark ? "#FFF" : "#0a0a0a"} strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
            </svg>
        </li>
    )
}

export default IndItem