import React, {useState} from 'react'
import style from "../styles/input.module.scss"
import {v4 as uuid} from "uuid"
import {toast} from "react-toastify"
import {Todo} from "../utilities/types"

interface Props {
    getItem: (todo:Todo)=>void;
    isDark: boolean;
    globalStyle: {
        dark:string,
        light:string,
    };
}



const Input = ({getItem, isDark, globalStyle}: Props) => {
    const [todo, setTodo] = useState<Todo>({id:uuid(), title:"", todo:"", completed:false});

    const handleSubmit = (e:React.MouseEvent) => {
        console.log()
        if(!todo.title){
            return toast.error("Enter title.")
        }
        if(!todo.todo){
            return toast.error("Enter TODO item.")
        }
        //save
        console.log(todo)
        getItem(todo)
        setTodo({id:uuid(), title:"", todo:"", completed:false})
        toast.success("Item saved.", {
            progress:0
        })
        
    }
  return (
    <div className={`${style.input} ${isDark ? globalStyle.dark : globalStyle.light}`}>
        <input 
            className={`${style.title}`} 
            type="text" 
            value={todo.title}
            onChange={(e)=>setTodo({...todo, title:e.target.value})} 
            placeholder="Create a new todo title." 
        />
        <textarea 
            className={style.area} 
            placeholder='Enter TODO item.' 
            value={todo.todo} 
            onChange={(e)=>setTodo({...todo, todo:e.target.value})}
        ></textarea>
        <button type="button" className={style.add} onClick={(e)=>handleSubmit(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`bi bi-plus `} viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </button>
    </div>
  )
}

export default Input