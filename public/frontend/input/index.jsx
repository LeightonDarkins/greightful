import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleClick() {
    axios.post('/greightful', {
      greightfulContent: this.state.value
    }).then((response) => {
      console.info(response)
    }).catch((error) => {
      console.error(error)
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <label htmlFor='greightful-input'>Greightful: </label>
          <input id='greightful-input' type='text' value={this.state.value} onChange={this.handleChange}/>
          <button type='submit' onClick={this.handleClick}>Be Greightful</button>
        </div>
      </div>
    )
  }
}

render(<Input/>, document.getElementById('input'))
