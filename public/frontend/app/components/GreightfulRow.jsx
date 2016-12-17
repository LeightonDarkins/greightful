import React from 'react'

class GreightfulRow extends React.Component {
  render() {
    return (
      <div id='greightful-row' className='row entry col-md-6 col-md-offset-3' onClick={ this.props.clickHandler }>
        <h2>
          { this.props.greightfulContent }
        </h2>

        <p>
          { this.props.date }
        </p>

        <div className='row buttons'>
          <span className='col-md-6'>
            <i id='like' className='fa fa-heart like' onClick={ this.clickHandler }>
              <span className='interaction-value'> { this.props.likes }</span>
            </i>
          </span>
          <span className='col-md-6'>
            <i id='dislike' className='fa fa-thumbs-down dislike' onClick={ this.clickHandler }>
              <span className='interaction-value'> { this.props.dislikes }</span>
            </i>
          </span>
        </div>
      </div>
    )
  }
}

export default GreightfulRow
