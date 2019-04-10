import React from 'react'


import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

let person = '';
let inputRef = null
const persons = [
    { value: 'Person1', label: 'Person 1' },
    { value: 'Person2', label: 'Person 2' },
    { value: 'Person3', label: 'Person 3' },
  ]

const selectUser = (data) => {
    person = data.value
}

const AddTodo = ({ onAddButtonClick }) => {
    return(
    <div className="addTodo">
        <input className="inputText" ref={(ref) => { inputRef = ref }} type="text" />
        <Dropdown className='dropdown' options={persons} onChange={selectUser} placeholder="Select an User" />
        <button onClick={() => {
            const val = inputRef.value
            inputRef.value = ''
            onAddButtonClick(val, person )
        }}>Add Todo</button>
    </div>
    )
}

export default AddTodo