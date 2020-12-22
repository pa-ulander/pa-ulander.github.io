import React from 'react'
import { shallow } from 'enzyme'
import Layout from '../../src/components/Layout'

describe('Layout component', () => {
  it('should render correctly', () => {
    const component = shallow(<Layout />)
    expect(component).toMatchSnapshot()
  })
})
