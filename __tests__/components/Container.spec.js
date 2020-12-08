import React from 'react'
import { shallow } from 'enzyme'
import Container from '../../src/components/Container'

describe('Container component', () => {
  it('should render correctly', () => {
    const component = shallow(<Container />)
    expect(component).toMatchSnapshot()
  })
})
