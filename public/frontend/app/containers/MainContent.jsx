import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import GreightfulRow from '../components/GreightfulRow.jsx';

class MainContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      greightfulRow: {},
      loading: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    axios.get('/greightful').then((response) => {
      this.setState({ greightfulRow: response.data });

      this.setState({ loading: false });

      console.log(this.state);
    }).catch((error) => {
      // TODO: display an error to the user
    });
  }

  showLoadingSpinner() {
    this.setState({ loading: true });
  }

  hideLoadingSpinner() {
    this.setState({ loading: false });
  }

  updateGreightful(greightfulRow) {
    this.showLoadingSpinner();

    axios.put('/greightful', greightfulRow ).then((response) => {
      console.log(response.data);

      this.hideLoadingSpinner();
    }).catch((error) => {
      // TODO: display error!
    });
  }

  handleClick(event) {
    let eventSource = event.target.id;

    if (eventSource === 'like') {
      let updatedGreightfulRow = this.state.greightfulRow;

      updatedGreightfulRow.likes += 1;

      this.setState({
        greightfulRow: updatedGreightfulRow
      });

      this.updateGreightful(this.state.greightfulRow);

    } else if (eventSource == 'dislike') {
      let updatedGreightfulRow = this.state.greightfulRow;

      updatedGreightfulRow.dislikes += 1;

      this.setState({
        greightfulRow: updatedGreightfulRow
      });

      this.updateGreightful(this.state.greightfulRow);
    }

    this.showLoadingSpinner();

    axios.get('/greightful').then((response) => {
      this.setState({ greightfulRow: response.data });

      this.hideLoadingSpinner();
    }).catch((error) => {
      // TODO: display an error to the user
    });
  }

  render() {
    let contentToShow = null;

    if (this.state.loading) {
      contentToShow = (
        <div className='row col-md-6 col-md-offset-3'>
          <i className='fa fa-spinner fa-2x fa-spin loading-spinner'></i>
        </div>
      );
    } else {
      contentToShow = (
        <div>
          <GreightfulRow
            greightfulContent={ this.state.greightfulRow.greightfulContent}
            date={ this.state.greightfulRow.date }
            clickHandler={ this.handleClick }
            likes={ this.state.greightfulRow.likes }
            dislikes={ this.state.greightfulRow.dislikes }
          />
          <div className='row navigation col-md-6 col-md-offset-3'>
            Click the yellow box to see something else I've been grateful for in 2017
          </div>
        </div>
      );
    }

    if (_.isEmpty(this.state.greightfulRow)) {
      return (
        <div className='row main-content'>
          I'm not grateful for anything yet...
        </div>
      );
    } else {
      return (
        <div className='row main-content'>
          { contentToShow }
        </div>
      );
    }
  }
}

export default MainContent;
