import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: 'test' };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
    axios.post('/greightful', {
      greightfulContent: this.state.value
    }).then((response) => {
      // TODO: display the response to the user
    }).catch((error) => {
      // TODO: display an error to the user
    });
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
    );
  }
}

render(<Input/>, document.getElementById('input'));
