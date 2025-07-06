import React from 'react'
import { render } from '@testing-library/react'
import HeaderNav from '../../src/components/HeaderNav'

// Mock the hooks used in HeaderNav
jest.mock('../../src/hooks/useDarkMode', () => {
  return jest.fn(() => ({
    value: false,
    toggle: jest.fn(),
  }))
})

describe('Header component', () => {
  it('should render correctly', () => {
    const { container } = render(<HeaderNav />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
