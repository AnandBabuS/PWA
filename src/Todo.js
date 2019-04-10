import React from 'react'

const Todo = ({ todo, assignee }) => {
    return(
    <div className="todo">
        <div>{todo}</div>
        <div className="assignee">assignee:{assignee}</div>
    </div>
    )
}

export default Todo