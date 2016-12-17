import React from 'react';

class GreightfulRow extends React.Component {
  render(){
    return (
      <div id='greightful-row' className='row entry col-md-6 col-md-offset-3' onClick={ this.props.clickHandler }>
        <h2>
          { this.props.greightfulContent }
        </h2>

        <p>
          { this.props.date }
        </p>

        <div className='row buttons'>
          <i id='like' className='col-md-6 fa fa-heart like' onClick={ this.clickHandler }>
            <span className='interaction-value'> { this.props.likes }</span>
          </i>
          <i id='dislike' className='col-md-6 fa fa-thumbs-down dislike' onClick={ this.clickHandler }>
            <span className='interaction-value'> { this.props.dislikes }</span>
          </i>
        </div>
      </div>
    );
  }
}

export default GreightfulRow;
