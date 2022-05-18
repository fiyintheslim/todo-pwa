import { useState } from 'react'
import { v4 as uuid } from "uuid"
import Head from "./layouts/Head"
import Item from "./components/IndItem"
import Container from "./layouts/Container"
import "./styles/App.css"
import * as style from './styles/app.module.scss'


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
    function x(e: any) {
        console.log(e.target.parent)
    }


    return (
        <>
            <Container isDark={isDark}>
                <div className={style.bg}>

                </div>
                <div className="not-bg">
                    <Head isDark={isDark} setDark={setDark} />
                    <input type="text" onKeyUp={(e) => getItem(e)} placeholder="Create a new todo" />
                    <ul className="todos">
                        {todo.map(i => {
                            return (
                                <Item isDark={isDark} key={i.id} id={i.id} complete={i.completed} x={x}>
                                    {i.todo}
                                </Item>
                            )
                        })}

                    </ul>
                    <div>
                        <p className="last">
                            <span id="remain">{todo.length} {todo.length <= 1 ? "item" : "items"} left</span>
                            <span id="clear" onClick={() => clear()} >clear completed</span>
                        </p>
                    </div>
                </div>

            </Container>
        </>
    )
}

export default App