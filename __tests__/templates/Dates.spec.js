import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer'
import { StaticQuery } from 'gatsby'
import PostTemplate from '../../src/templates/PostTemplate'

jest.mock('gatsby-plugin-mdx', () => {
  return {
    MDXRenderer: ({ children }) => {
      return <div>{children}</div>
    },
  }
})

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) => {
    render({
      mdx: {
        body: '',
        frontmatter: {},
      },
    })
  })
})

describe('Post Template', () => {
    test('should render year if post is from 2020', () => {
        const data = {
            mdx: {
               frontmatter: {
                title: 'Fourth post has bears',
                date: '4th December 2020'
              },
            },
          }

        render(<PostTemplate data={data} pageContext={{}} />);
        expect(screen.getByText('4th December 2020')).toBeTruthy();
    });
});