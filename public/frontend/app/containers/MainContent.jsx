import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import GreightfulRow from '../components/GreightfulRow.jsx'
import GreightfulButton from '../components/GreightfulButton.jsx'

class MainContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      greightfulRow: {},
      loading: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleLikeOrDislike = this.handleLikeOrDislike.bind(this)
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

  handleClick() {
    this.getGreightful()
  }

  handleLikeOrDislike(event) {
    let eventSource = event.target.id

    let updatedGreightfulRow = this.state.greightfulRow

    if (eventSource === 'like') {
      updatedGreightfulRow.likes += 1
    } else if (eventSource === 'dislike') {
      updatedGreightfulRow.dislikes += 1
    }

    this.setState({
      greightfulRow: updatedGreightfulRow
    })

    this.updateGreightful()
  }

  updateGreightful() {
    this.showLoadingSpinner()

    let url = `/greightful/${this.state.greightfulRow._id}`

    axios.put(url, this.state.greightfulRow ).then((response) => {
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
      <div className="buttons row col-md-4 col-md-offset-4">
          <GreightfulButton
            type='like'
            count={ this.state.greightfulRow.likes }
            clickHandler={ this.handleLikeOrDislike }
          />
          <GreightfulButton
            type='dislike'
            count={ this.state.greightfulRow.dislikes }
            clickHandler={ this.handleLikeOrDislike }
          />
        </div>
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
      <div className='main-content'>
        { contentToShow }
      </div>
    )
  }
}

export default MainContent
