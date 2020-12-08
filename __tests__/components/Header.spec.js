import React from 'react'
import { shallow } from 'enzyme'
import renderer from "react-test-renderer"
import Header from './../../src/components/Header'

describe('Header component', () => {
  it('should render correctly', () => {
    const component = shallow(<Header />)
    expect(component).toMatchSnapshot()
  })
})

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})