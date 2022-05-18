import React from 'react'

interface Props {
    children: React.ReactNode,
    isDark: boolean,
    complete: boolean,
    x: Function,
    id: string
}

const IndItem = ({ children, isDark, x, id }: Props) => {
    return (
        <li>
            <div>{children}</div>
            <img alt="cross" src="/" onClick={(e) => x(id)} />
        </li>
    )
}

export default IndItem