import React, { useState } from 'react'
import imageAdd from '../add.png'
import imageRemove from '../remove.png'

export default function Main() {
    const [todoList, setTodoList] = useState([])

    function removeItem(item) {
        let newList = todoList.filter((i) => i.createdTime !== item.createdTime)
        setTodoList(newList)
    }

    function addItem(item) {
        let newList = todoList.slice()
        newList.push(item)
        setTodoList(newList)
    }

    return (
        <div>
            <TodoInput onAddNewTodoCallback={addItem} />
            {todoList.map((item) =>
                <TodoItem item={item} onRemove={removeItem} key={item.createdTime} />
            )}
        </div>
    )
}

function TodoInput(props) {
    const [note, setNote] = useState("")
    const [amount, setAmount] = useState("")

    function onChanged(event) {
        if (event.target.name === "usename") {
            setNote(event.target.value)
        } else {
            setAmount(event.target.value)
        }
    }

    function onAddNewTodo() {
        if (note === "" || amount === "") {
            alert("Please enter something to save!")
        } else {
            props.onAddNewTodoCallback({
                note: note,
                amount: amount,
                createdTime: new Date().getTime()
            })
            setNote("")
            setAmount("")
        }
    }

    return (
        <div>
            <input name="usename" type="text" placeholder="Nhập tên" value={note} onChange={onChanged} />
            <input name="amount" type="text" placeholder="Nhập số tiền" value={amount} onChange={onChanged} />
            <img src={imageAdd} width="24" onClick={onAddNewTodo} />
        </div>
    )
}

function TodoItem(props) {
    return (
        <div>
            {props.item.note}
            <strong>{props.item.amount}</strong>
            <img src={imageRemove} width="20" onClick={() => props.onRemove(props.item)} />
        </div>
    )
}