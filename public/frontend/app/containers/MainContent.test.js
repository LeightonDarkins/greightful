import React from 'react'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'

import MainContent from './MainContent'
import GreightfulRow from '../components/GreightfulRow'

describe('MainContent', () => {
  const shallowRenderComponent = () => {
    return shallow(<MainContent />)
  }

  const mountComponent = () => {
    return mount(<MainContent />)
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
      wrapper.setState({
        greightfulRow: {
          greightfulContent: 'test',
          date: '11/22/33',
          like: '10',
          dislikes: '12'
        }
      })

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
  })

  describe('mount', () => {
    beforeEach(() => {
      let server = sinon.fakeServer.create()
      server.respond('GET', '/greightful', '{ "greightfulContent": "test"}')

      sinon.spy(MainContent.prototype, 'getGreightful')

      mountComponent()
    })

    it('mounts and trys to load a GreightfulRow', () => {
      expect(MainContent.prototype.getGreightful.calledOnce).toBe(true)
    });
  })
})
