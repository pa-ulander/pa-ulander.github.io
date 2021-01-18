import React from 'react'
import { render } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import SEO from '../../src/components/Seo'

describe('SEO component', () => {
  beforeAll(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {},
      },
    })
  })

  it('renders the tests correctly', () => {
    const mockData = {
      site: {
        siteMetadata: {
          title: 'Yet another developers personal website',
          author: {
            name: 'pa@kabelkultur.se',
            summary: 'A very nice fellow that created this blog',
          },
          description: 'Learning Gatsby and other things',
          siteUrl: 'https://localhost:8000',
          social: {
            email: 'mailto:pa@kabelkultur.se',
            linkedin: 'https://linkedin.com/in/paulander',
            twitter: 'https://twitter.com/pa_ulander',
            github: 'https://github.com/pa-ulander',
          },
        },
      },
    }

    render(
      <SEO
        description={mockData.site.siteMetadata.description}
        title={mockData.site.siteMetadata.title}
      />
    )

    const { title, metaTags } = Helmet.peek()

    expect(title).toBe(mockData.site.siteMetadata.title)
    expect(metaTags[0].content).toBe(mockData.site.siteMetadata.description)
    expect(metaTags[4].content).toBe(mockData.site.siteMetadata.social.twitter)
    expect(metaTags.length).toBe(7)
  })
})
