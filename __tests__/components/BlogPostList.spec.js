import React from 'react'
import { shallow } from 'enzyme'
import BlogPostList from '../../src/components/BlogPostList'

describe('BlogPostList component', () => {
  it('should render correctly', () => {
    const component = shallow(<BlogPostList />)
    expect(component).toMatchSnapshot()
  })
})
