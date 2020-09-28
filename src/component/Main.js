import React from 'react'
import imageAdd from '../add.png'
import imageRemove from '../remove.png'

export default class Main extends React.Component {
    constructor(props) {
        super()
        this.state = {
            todoList: []
        }
        this.removeItem = this.removeItem.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    render() {
        return (
            <div>
                <TodoInput onAddNewTodo={this.addItem} />
                {this.state.todoList.map((item) =>
                    <TodoItem item={item} onRemove={this.removeItem} key={item.createdTime} />
                )}
            </div>
        )
    }

    removeItem(item) {
        let newList = this.state.todoList.filter((i) => i.createdTime !== item.createdTime)
        this.setState({
            todoList: newList
        })
    }

    addItem(item) {
        let newList = this.state.todoList.slice()
        newList.push(item)
        this.setState({
            todoList: newList
        })
    }
}

class TodoInput extends React.Component {
    constructor(props) {
        super()
        this.state = {
            note: "",
            amount: ""
        }
        this.onChanged = this.onChanged.bind(this)
        this.onAddNewTodo = this.onAddNewTodo.bind(this)
    }

    render() {
        return (
            <div>
                <input name="usename" type="text" placeholder="Nhập tên" value={this.state.note} onChange={this.onChanged} />
                <input name="amount" type="text" placeholder="Nhập số tiền" value={this.state.amount} onChange={this.onChanged} />
                <img src={imageAdd} width="24" onClick={this.onAddNewTodo} />
            </div>
        )
    }

    onChanged(ip) {
        
        if (ip.target.name === "usename") {
            console.log(ip.target.name)
            this.setState({
                note: ip.target.value
            })
        } else {
            console.log(ip.target.name)
            this.setState({
                amount: ip.target.value
            })
        }
    }

    onAddNewTodo() {
        if (this.state.note === "" || this.state.amount === "") {
            alert("Please enter something to save!")
        } else {
            this.props.onAddNewTodo({
                note: this.state.note,
                amount: this.state.amount,
                createdTime: new Date().getTime()
            })
            this.setState({ note: "", amount: "" })
        }
    }
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