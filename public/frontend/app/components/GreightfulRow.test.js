import React from 'react'
import { shallow, mount, render } from 'enzyme'

import GreightfulRow from './GreightfulRow'
import GreightfulButton from './GreightfulButton'

describe('GreightfulRow', () => {
  it('should render without throwing an error', () => {
    let output = shallow(<GreightfulRow greightfulContent='test' date='11/22/33' likes='10' dislikes='0'/>)

    expect(output.type()).toEqual('div')
    expect(output.hasClass('greightful-row')).toBe(true)

    let heading = output.childAt(0)
    expect(heading.type()).toEqual('h2')
    expect(heading.text()).toEqual('test')

    let date = output.childAt(1)
    expect(date.type()).toEqual('p')
    expect(date.text()).toEqual('11/22/33')

    let buttons = output.childAt(2)
    expect(buttons.hasClass('buttons')).toBe(true)

    let greightfulButtons = output.find(GreightfulButton)
    expect(greightfulButtons.length).toBe(2)
  })

  it('should mount and display the correct child values', () => {
    let output = mount(<GreightfulRow greightfulContent='test' date='11/22/33' likes='10' dislikes='25'/>)

    expect(output.find('#dislike').length).toBe(1)
    expect(output.find('#dislike span').text()).toBe(' 25')

    expect(output.find('#like').length).toBe(1)
    expect(output.find('#like span').text()).toBe(' 10')
  })
})
