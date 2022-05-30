import React, { useState, useRef, useEffect } from 'react'
import {Dialog} from "@headlessui/react"
import Head from "./layouts/Head"
import Item from "./components/IndItem"
import Container from "./layouts/Container"
import Input from "./components/Input"
import "./styles/App.css"
import * as style from './styles/app.module.scss'
import {Todo} from "./utilities/types"
import darkBG from "./images/bg-desktop-dark.jpg"
import lightBG from "./images/bg-desktop-light.jpg"
import TrashSVG from "./components/TrashSVG"
import XSVG from "./components/XSVG"
import {openDB, addData , loadData, removeOne, removeMany, updateOne} from "./utilities/db"




const App = () => {
    const [isDark, setDark] = useState(true);
    const [todo, addTodo] = useState<Todo[]>([]);
    const [expanded, setExpanded] = useState<Todo | undefined>(undefined)
    const dbRef = useRef<null | IDBOpenDBRequest>(null)
    
    useEffect(()=>{
        const db = openDB()
        loadData(addTodo)
        
    }, [])

    function getItem(item:Todo) {
       
        addTodo([...todo, item])
        
        addData(item)
        
        
    }
    function clear() {
        if (todo.length > 0) {
            let toBeRem = todo.filter(i => {
                return i.completed === true
            })
            let rem = todo.filter(i => {
                return i.completed === false
            })
            addTodo(rem)
            removeMany(toBeRem)
        }

    }
    function remove (id?:string) {
        if(id){
            console.log("remove", id)
            const filtered = todo.filter(item=>item.id !== id);
            addTodo(filtered)
            hide()
            removeOne(id)
        }
    }
    function expand(e:React.MouseEvent, todo:Todo) {
        e.stopPropagation();
        setExpanded(todo)
    }
    function hide () {
        
        setExpanded(undefined)
    }

    function x(e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) { 
        
        let newTodo = todo.map((ind) => {
            if (ind.id === id) {
                return { ...ind, completed: !ind.completed }
            }
            return ind
        })
        let toUpdate = newTodo.find((e)=>e.id === id) 
        addTodo(newTodo)
        updateOne(toUpdate)
    }


    return (
        <>
            <Container isDark={isDark}>

                <div className={`${style.bg} `}>
                    <img className={style.bgIMG} src={isDark ? darkBG : lightBG} />
                    <Head isDark={isDark} setDark={setDark} />
                    <Input getItem={getItem} globalStyle={style} isDark={isDark}  />
                </div>
                <div className={style.content}>
                    {todo.length > 0 ?
                    <ul className={style.items}>

                        {todo.map((i) => {
                            return (
                                <Item item={i} isDark={isDark} key={i.id} id={i.id} complete={i.completed} x={x} expand={expand} />
                            )
                        })}

                    </ul>
                    :
                    <div className={style.empty}>
                        <p>Items you add appear here.</p>
                    </div>
                    }

                    <div className={style.info}>
                        <p className="last">
                            <span id="remain">{todo.filter((item) => !item.completed).length} {todo.length <= 1 ? "item" : "items"} left</span>
                        </p>
                        <button type="button" id="clear" onClick={() => clear()} >clear completed</button>

                    </div>
                </div>

            </Container>
            <Dialog
                open={!!expanded}
                onClose={()=>hide()}
                className={style.dialog}
            >
                <Dialog.Panel className={`${style.panel} ${isDark ? style.dark : style.light}`}>
                    <h3>{expanded?.title}</h3>
                    <p>{expanded?.todo}</p>
                    <div className={style.dialogFooter}>
                        <TrashSVG onClick={()=>remove(expanded?.id)} />
                    </div>
                    <XSVG onClick={()=>hide()} className={style.close} />
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default App