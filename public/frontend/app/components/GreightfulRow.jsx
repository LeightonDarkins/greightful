import React from 'react';

class GreightfulRow extends React.Component {
  render(){
    return (
      <div className='row entry col-md-6 col-md-offset-3' onClick={ this.props.clickHandler }>
        <h2>
          { this.props.greightfulContent }
        </h2>

        <p>
          { this.props.date }
        </p>

        <div className='row buttons'>
          <i id='like' className='col-md-6 fa fa-2x fa-heart like' onClick={ this.clickHandler }> { this.props.likes }</i>
          <i id='dislike' className='col-md-6 fa fa-2x fa-thumbs-down dislike' onClick={ this.clickHandler }> { this.props.dislikes }</i>
        </div>
      </div>
    );
  }
}

export default GreightfulRow;
