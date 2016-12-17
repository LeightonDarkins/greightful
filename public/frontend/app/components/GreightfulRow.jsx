import React from 'react'

import GreightfulButton from './GreightfulButton.jsx'

class GreightfulRow extends React.Component {
  render() {
    return (
      <div id='greightful-row' className='row entry col-md-6 col-md-offset-3 greightful-row' onClick={ this.props.clickHandler }>
        <h2>
          { this.props.greightfulContent }
        </h2>

        <p>
          { this.props.date }
        </p>

        <div className='row buttons'>
          <GreightfulButton
            type='like'
            count={ this.props.likes }
            onClick={ this.props.clickHandler }
          />
          <GreightfulButton
            type='dislike'
            count={ this.props.dislikes }
            onClick={ this.props.clickHandler }
          />
        </div>
      </div>
    )
  }
}

export default GreightfulRow
