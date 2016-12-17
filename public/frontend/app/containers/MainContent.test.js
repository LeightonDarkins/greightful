import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import MainContent from './MainContent'
import GreightfulRow from '../components/GreightfulRow'

import MainContentMock from '../mocks/MainContentMock'

describe('MainContent', () => {
  const shallowRenderComponent = () => {
    return shallow(<MainContent />)
  }

  const setStateForWrapper = (wrapper) => {
    wrapper.setState({
      greightfulRow: {
        greightfulContent: 'test',
        date: '11/22/33',
        likes: 10,
        dislikes: 12
      }
    })
  }

  const createEventWithTargetId = (id) => {
    return {
      target: {
        id
      }
    }
  }

  describe('shallow render', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowRenderComponent()
    })

    it('renders with no greightfulRow', () => {
      expect(wrapper.type()).toEqual('div')
      expect(wrapper.hasClass('main-content')).toBe(true)

      expect(wrapper.find('.message').length).toBe(1)

      expect(wrapper.state().greightfulRow).toEqual({})
      expect(wrapper.state().loading).toEqual(false)
    })

    it('renders with a greightfulRow', () => {
      setStateForWrapper(wrapper)

      expect(wrapper.find('.message').length).toBe(0)
      expect(wrapper.find(GreightfulRow).length).toBe(1)
      expect(wrapper.find('.navigation').length).toBe(1)
    })

    it('renders with a loading spinner', () => {
      wrapper.setState({ loading: true })
      expect(wrapper.find('.loading-spinner').length).toBe(1)

      wrapper.setState({ loading: false })
      expect(wrapper.find('.loading-spinner').length).toBe(0)
    })

    describe('.showLoadingSpinner & .hideLoadingSpinner', () => {
      it('change the loading state', () => {
        expect(wrapper.state().loading).toBe(false)

        wrapper.instance().showLoadingSpinner()
        expect(wrapper.state().loading).toBe(true)

        wrapper.instance().hideLoadingSpinner()
        expect(wrapper.state().loading).toBe(false)
      })
    })

    describe('.handleClick', () => {
      beforeEach(() => {
        sinon.spy(MainContent.prototype, 'handleLikeOrDislike')
        sinon.spy(MainContent.prototype, 'updateGreightful')
        sinon.spy(MainContent.prototype, 'getGreightful')
      })

      afterEach(() => {
        MainContent.prototype.handleLikeOrDislike.restore()
        MainContent.prototype.updateGreightful.restore()
        MainContent.prototype.getGreightful.restore()
      })

      it('calls .getGreightful with', () => {
        wrapper.instance().handleClick()

        expect(MainContent.prototype.getGreightful.calledOnce).toBe(true)
      })
    })

    describe('.handleLikeOrDislike', () => {
      beforeEach(() => {
        setStateForWrapper(wrapper)
        sinon.spy(MainContent.prototype, 'updateGreightful')
      })

      afterEach(() => {
        MainContent.prototype.updateGreightful.restore()
      })

      it('correctly changes the number of likes', () => {
        let event = createEventWithTargetId('like')

        wrapper.instance().handleLikeOrDislike(event)

        expect(wrapper.state().greightfulRow.likes).toBe(11)
        expect(MainContent.prototype.updateGreightful.calledOnce).toBe(true)
      })

      it('correctly changes the number of dislikes', () => {
        let event = createEventWithTargetId('dislike')

        wrapper.instance().handleLikeOrDislike(event)

        expect(wrapper.state().greightfulRow.dislikes).toBe(13)
        expect(MainContent.prototype.updateGreightful.calledOnce).toBe(true)
      })
    })
  })

  describe('mount', () => {
    beforeEach(() => {
      let server = sinon.fakeServer.create()
      server.respond('GET', '/greightful', '{}')

      sinon.spy(MainContent.prototype, 'getGreightful')
    })

    afterEach(() => {
      MainContent.prototype.getGreightful.restore()
    })

    it('mounts and trys to load a GreightfulRow', () => {
      mount(<MainContent />)

      expect(MainContent.prototype.getGreightful.calledOnce).toBe(true)
    });

    it('should mount and display the correct child values', () => {
      let wrapper = mount(<MainContentMock />)

      expect(wrapper.find('#dislike').length).toBe(1)
      expect(wrapper.find('#dislike span').text()).toBe(' 12')

      expect(wrapper.find('#like').length).toBe(1)
      expect(wrapper.find('#like span').text()).toBe(' 10')
    })
  })
})
