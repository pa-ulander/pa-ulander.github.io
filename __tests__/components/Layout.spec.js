import React from 'react'
import { render } from '@testing-library/react'
import Layout from '../../src/components/Layout'

// Mock Gatsby's StaticQuery
jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  useStaticQuery: jest.fn(() => ({
    site: {
      siteMetadata: {
        title: 'Test Site',
        description: 'Test Description',
      },
    },
  })),
}))

describe('Layout component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Layout>
        <div>Test content</div>
      </Layout>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
