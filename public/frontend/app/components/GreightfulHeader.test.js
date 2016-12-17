import React from 'react'
import { shallow, mount } from 'enzyme'

import GreightfulHeader from './GreightfulHeader'

describe('GreightfulHeader', () => {
  it('Should render the correct elements', () => {
    let output = shallow(<GreightfulHeader />)
    let headingMarkup = <h1>#greightful</h1>
    let twitterLinkMarkup = <a href='https://twitter.com/LeightonDarkins'>@LeightonDarkins</a>

    expect(output.contains(headingMarkup)).toBe(true)
    expect(output.contains(twitterLinkMarkup)).toBe(true)
  })

  it('should be selectable by .greightful-heading', () => {
    let output = shallow(<GreightfulHeader />)

    expect(output.is('.greightful-heading')).toBe(true)
  })

  it('should mount in a full DOM', () => {
    let output = mount(<GreightfulHeader />)

    expect(output.find('.greightful-heading').length).toBe(1)
  })
})
