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
            note: ""
        }
        this.onChanged = this.onChanged.bind(this)
        this.onAddNewTodo = this.onAddNewTodo.bind(this)
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Enter todo" value={this.state.note} onChange={this.onChanged} />
                <img src={imageAdd} width="24" onClick={this.onAddNewTodo} />
            </div>
        )
    }

    onChanged(ip) {
        console.log(typeof ip.target.value)
        this.setState({
            note: ip.target.value
        })
    }

    onAddNewTodo() {
        if (this.state.note === "") {
            alert("Please enter something to save!")
        } else {
            this.props.onAddNewTodo({
                note: this.state.note,
                createdTime: new Date().getTime()
            })
            this.setState({ note: "" })
        }
    }
}

function TodoItem(props) {
    return (
        <div>
            {props.item.note}
            <img src={imageRemove} width="20" onClick={() => props.onRemove(props.item)} />
        </div>
    )
}