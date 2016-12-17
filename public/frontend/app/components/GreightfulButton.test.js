import React from 'react'
import { shallow, mount, render } from 'enzyme'

import GreightfulButton from './GreightfulButton'

describe('GreightfulButton', () => {
  it('renders', () => {
    let wrapper = shallow(<GreightfulButton type='like' count='10'/>)

    expect(wrapper.type()).toEqual('span')
    expect(wrapper.hasClass('col-md-6')).toBe(true)
  })

  it('renders correctly for like', () => {
    let wrapper = shallow(<GreightfulButton type='like' count='10'/>)

    let icon = wrapper.childAt(0)
    expect(icon.type()).toEqual('i')
    expect(icon.hasClass('fa-heart')).toBe(true)
    expect(icon.hasClass('like')).toBe(true)
  })

  it('renders correctly for dislike', () => {
    let wrapper = shallow(<GreightfulButton type='dislike' count='10'/>)

    let icon = wrapper.childAt(0)
    expect(icon.type()).toEqual('i')
    expect(icon.hasClass('fa-thumbs-down')).toBe(true)
    expect(icon.hasClass('dislike')).toBe(true)
  })

  it('mounts and shows the correct like count', () => {
    let wrapper = mount(<GreightfulButton type='like' count='10'/>)

    let interactionValue = wrapper.find('.interaction-value')

    expect(interactionValue.length).toBe(1)
    expect(interactionValue.text()).toEqual(' 10')

    let icon = wrapper.find('#like')

    expect(icon.length).toBe(1)
  })

  it('mounts and shows the correct dislike count', () => {
    let wrapper = mount(<GreightfulButton type='dislike' count='30'/>)

    let interactionValue = wrapper.find('.interaction-value')

    expect(interactionValue.length).toBe(1)
    expect(interactionValue.text()).toEqual(' 30')

    let icon = wrapper.find('#dislike')

    expect(icon.length).toBe(1)
  })
})
