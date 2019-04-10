import React from "react";

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
    { value: 'Person1', label: 'Person 1' },
    { value: 'Person2', label: 'Person 2' },
    { value: 'Person3', label: 'Person 3' },
  ]

export default class App extends React.Component {
    
    render(){
        return (
            <div>
                <div style={{ marginTop: '10%' }}> Select the User to logon</div>
                <Dropdown className='dropdown' options={options} onChange={this.props.selectUser} placeholder="Login as" />
            </div>
        );
    }
  }

  