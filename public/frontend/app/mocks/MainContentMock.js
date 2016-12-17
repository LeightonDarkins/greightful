import MainContent from '../containers/MainContent'

class MainContentMock extends MainContent {
  componentDidMount() {
    this.setState({
      greightfulRow: {
        greightfulContent: 'test',
        date: '11/22/33',
        likes: 10,
        dislikes: 12
      }
    })
  }
}

export default MainContentMock
