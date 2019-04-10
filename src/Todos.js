import React from "react";
import axios from 'axios'
import Todo from './Todo';
import AddTodo from './AddTodo'

export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            todos: []
        }
        this.onAddButtonClick = this.onAddButtonClick.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    loadData() {
        axios.get("https://workon-5984c.firebaseapp.com/todos").then((response) => {
            this.setState({ todos: response.data })
        })
    }

    componentDidMount() {
        this.loadData()
    }


  onAddButtonClick(todo, person) {
    const data = {
        todo,
        assignee: person
    }
    axios.post("https://workon-5984c.firebaseapp.com/addTodo", data
    ).then((response) => {
        this.loadData()
    }).catch((error) =>{
        const todos = this.state.todos
        todos.push(data)
        this.setState({ todos })
        window.localStorage.setItem("offlineData", JSON.stringify(data))
    })
  }
    
    render(){
        const { todos } = this.state
        const todosElements = todos.map((data) => <Todo todo={data.todo} assignee={data.assignee} />)
        return (
            <div style={{ marginTop: '10px' }}>
                <AddTodo onAddButtonClick={this.onAddButtonClick}/>
                <div style={{ marginTop: '20px', overflow: "scroll" }}>{todosElements}</div>
            </div>
        );
    }
  }

  