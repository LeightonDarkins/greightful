import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import GreightfulRow from '../components/GreightfulRow.jsx'

class MainContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      greightfulRow: {},
      loading: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.getGreightful()
  }

  getGreightful() {
    this.showLoadingSpinner()

    axios.get('/greightful').then((response) => {
      this.setState({ greightfulRow: response.data })

      this.hideLoadingSpinner()
    }).catch((error) => {
      console.error(error)
      this.hideLoadingSpinner()
    })
  }

  handleClick(event) {
    let eventSource = event.target.id

    if (eventSource !== 'greightful-row') {
      this.handleLikeOrDislike(eventSource)
      this.updateGreightful()
    } else {
      this.getGreightful()
    }
  }

  handleLikeOrDislike(eventSource) {
    let updatedGreightfulRow = this.state.greightfulRow

    if (eventSource === 'like') {
      updatedGreightfulRow.likes += 1
    } else if (eventSource === 'dislike') {
      updatedGreightfulRow.dislikes += 1
    }

    this.setState({
      greightfulRow: updatedGreightfulRow
    })
  }

  updateGreightful() {
    this.showLoadingSpinner()

    axios.put('/greightful', this.state.greightfulRow ).then((response) => {
      this.hideLoadingSpinner()
    }).catch((error) => {
      console.error(error)
      this.hideLoadingSpinner()
    })
  }

  showLoadingSpinner() {
    this.setState({ loading: true })
  }

  hideLoadingSpinner() {
    this.setState({ loading: false })
  }

  loadingSpinnerElement() {
    return (
      <div className='row col-md-6 col-md-offset-3'>
        <i className='fa fa-spinner fa-2x fa-spin loading-spinner'></i>
      </div>
    )
  }

  greightfulRowElement() {
    return (
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
    )
  }

  render() {
    let contentToShow = null

    if (this.state.loading) {
      contentToShow = this.loadingSpinnerElement()
    } else if (_.isEmpty(this.state.greightfulRow)) {
      contentToShow = (
        <div className='row message col-md-6 col-md-offset-3'>
          I'm not grateful for anything yet...
        </div>
      )
    } else {
      contentToShow = this.greightfulRowElement()
    }

    return (
      <div className='row main-content'>
        { contentToShow }
      </div>
    )
  }
}

export default MainContent
