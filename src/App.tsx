import { useState } from 'react'
import { v4 as uuid } from "uuid"
import Head from "./layouts/Head"
import Item from "./components/IndItem"
import Container from "./layouts/Container"
import "./styles/App.css"
import * as style from './styles/app.module.scss'
import light from "./images/bg-desktop-light.jpg"



const App = () => {
    const [isDark, setDark] = useState(true);
    const [todo, addTodo] = useState([{ id: uuid(), todo: "say hello to the new neighbours", completed: false }]);

    function getItem(e: any) {

        if (e.which === 13 && e.target.value !== "") {
            addTodo([...todo, { id: uuid(), todo: e.target.value, completed: false }])
            e.target.value = "";
            console.log(uuid())

        }
    }
    function clear() {
        if (todo.length > 0) {
            let rem = todo.filter(i => {
                return i.completed === false
            })
            addTodo(rem)
        }

    }

    function x(e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) {
        let newTodo = todo.map((ind) => {

            if (ind.id === id) {
                console.log("match")
                return { ...ind, completed: !ind.completed }
            }
            return ind
        })

        addTodo(newTodo)

    }


    return (
        <>
            <Container isDark={isDark}>

                <div className={`${style.bg} ${isDark ? style.topImgDark : style.topImgLight}`}>

                </div>
                <div className={style.content}>
                    <Head isDark={isDark} setDark={setDark} />
                    <input className={`${style.input} ${isDark ? style.dark : style.light}`} type="text" onKeyUp={(e) => getItem(e)} placeholder="Create a new todo" />
                    <ul className={style.items}>

                        {todo.map(i => {
                            return (
                                <Item isDark={isDark} key={i.id} id={i.id} complete={i.completed} x={x}>
                                    {i.todo}
                                </Item>
                            )
                        })}

                    </ul>

                    <div className={style.info}>
                        <p className="last">
                            <span id="remain">{todo.filter((item) => !item.completed).length} {todo.length <= 1 ? "item" : "items"} left</span>
                        </p>
                        <button type="button" id="clear" onClick={() => clear()} >clear completed</button>

                    </div>
                </div>

            </Container>
        </>
    )
}

export default App