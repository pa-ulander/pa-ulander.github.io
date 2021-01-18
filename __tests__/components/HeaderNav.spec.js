import React from 'react'
import { shallow } from 'enzyme'
// import renderer from "react-test-renderer"
import HeaderNav from '../../src/components/HeaderNav'

describe('Header component', () => {
  it('should render correctly', () => {
    const component = shallow(<HeaderNav />)
    expect(component).toMatchSnapshot()
  })
})
