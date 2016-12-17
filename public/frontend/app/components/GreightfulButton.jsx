import React from 'react'

class GreightfulButton extends React.Component {
  render() {
    if (this.props.type === 'like') {
      return (
        <span className='col-md-3 col-md-offset-3'>
          <i id='like' className='fa fa-heart like' onClick={ this.props.clickHandler }>
            <span className='interaction-value'> { this.props.count }</span>
          </i>
        </span>
      )
    } else if (this.props.type === 'dislike') {
      return (
        <span className='col-md-3'>
          <i id='dislike' className='fa fa-thumbs-down dislike' onClick={ this.props.clickHandler }>
            <span className='interaction-value'> { this.props.count }</span>
          </i>
        </span>
      )
    }
  }
}

export default GreightfulButton
