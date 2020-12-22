import React from 'react'
import renderer from 'react-test-renderer'
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
  it('should render a blog post with mdx', () => {
    const data = {
      mdx: {
        body:
          'function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n/* @jsxRuntime classic */\n\n/* @jsx mdx */\nvar _frontmatter = {\n  "title": "Fourth post has bears",\n  "description": "Fourth post meta description",\n  "date": "2020-12-04T00:00:00.000Z",\n  "featuredImage": "./image.jpeg",\n  "featuredText": "Fourth post featured text",\n  "pageType": "blog",\n  "templateKey": "blog-post",\n  "published": true,\n  "slug": "fourth-post-has-bears",\n  "path": "/blog/fourth-post-has-bears",\n  "tags": ["dogs", "post"]\n};\nvar layoutProps = {\n  _frontmatter: _frontmatter\n};\nvar MDXLayout = "wrapper";\nreturn function MDXContent(_ref) {\n  var components = _ref.components,\n      props = _objectWithoutProperties(_ref, ["components"]);\n\n  return mdx(MDXLayout, _extends({}, layoutProps, props, {\n    components: components,\n    mdxType: "MDXLayout"\n  }), mdx("p", null, mdx("span", _extends({\n    parentName: "p"\n  }, {\n    "className": "gatsby-resp-image-wrapper",\n    "style": {\n      "position": "relative",\n      "display": "block",\n      "marginLeft": "auto",\n      "marginRight": "auto",\n      "maxWidth": "1500px"\n    }\n  }), "\\n      ", mdx("a", _extends({\n    parentName: "span"\n  }, {\n    "className": "gatsby-resp-image-link",\n    "href": "/static/b10a2b12966b76e153cbed58818309a3/c58a3/image.jpg",\n    "style": {\n      "display": "block"\n    },\n    "target": "_blank",\n    "rel": "noopener"\n  }), "\\n    ", mdx("span", _extends({\n    parentName: "a"\n  }, {\n    "className": "gatsby-resp-image-background-image",\n    "style": {\n      "paddingBottom": "33.3984375%",\n      "position": "relative",\n      "bottom": "0",\n      "left": "0",\n      "backgroundImage": "url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAHABQDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAEDBP/EABYBAQEBAAAAAAAAAAAAAAAAAAEAA//aAAwDAQACEAMQAAABo0mNID//xAAZEAACAwEAAAAAAAAAAAAAAAAAAgEDFBL/2gAIAQEAAQUCS+e9Lmhz/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAR/9oACAEDAQE/AVbb/8QAGBEAAgMAAAAAAAAAAAAAAAAAABEBEjH/2gAIAQIBAT8BVcHJ/8QAGhAAAAcAAAAAAAAAAAAAAAAAAAEQETFBUf/aAAgBAQAGPwIqbEkf/8QAGRAAAgMBAAAAAAAAAAAAAAAAAAEhQWGh/9oACAEBAAE/IZulYNOGw//aAAwDAQACAAMAAAAQcC//xAAXEQEAAwAAAAAAAAAAAAAAAAAAAREx/9oACAEDAQE/EJWrP//EABcRAAMBAAAAAAAAAAAAAAAAAAABUWH/2gAIAQIBAT8QSQND/8QAGRABAAMBAQAAAAAAAAAAAAAAAQARUUFh/9oACAEBAAE/EBoKE09l6vZVUCYBP//Z\')",\n      "backgroundSize": "cover",\n      "display": "block"\n    }\n  })), "\\n  ", mdx("img", _extends({\n    parentName: "a"\n  }, {\n    "className": "gatsby-resp-image-image",\n    "alt": "image info",\n    "title": "image info",\n    "src": "/static/b10a2b12966b76e153cbed58818309a3/c58a3/image.jpg",\n    "srcSet": ["/static/b10a2b12966b76e153cbed58818309a3/36dd4/image.jpg 512w", "/static/b10a2b12966b76e153cbed58818309a3/72e01/image.jpg 1024w", "/static/b10a2b12966b76e153cbed58818309a3/c58a3/image.jpg 1500w"],\n    "sizes": "(max-width: 1500px) 100vw, 1500px",\n    "style": {\n      "width": "100%",\n      "height": "100%",\n      "margin": "0",\n      "verticalAlign": "middle",\n      "position": "absolute",\n      "top": "0",\n      "left": "0"\n    },\n    "loading": "lazy"\n  })), "\\n  "), "\\n    ")), mdx("h2", null, "Lorem ipsum"), mdx("p", null, "Laborum nisi amet incididunt officia occaecat ullamco sint occaecat qui. Anim et culpa qui pariatur quis sit reprehenderit ipsum amet commodo cupidatat eiusmod deserunt mollit. Anim nostrud et fugiat eiusmod nisi cillum Lorem incididunt sit est minim dolore."), mdx("h3", null, "A beary list"), mdx("ol", null, mdx("li", {\n    parentName: "ol"\n  }, "one bear"), mdx("li", {\n    parentName: "ol"\n  }, "two bears"), mdx("li", {\n    parentName: "ol"\n  }, "three bears"), mdx("li", {\n    parentName: "ol"\n  }, "four bears")));\n}\n;\nMDXContent.isMDXComponent = true;',
        frontmatter: {
          title: 'Fourth post has bears',
          date: '4th December 2020',
          description: 'Fourth post meta description',
          templateKey: 'blog-post',
          featuredText: 'Fourth post featured text',
        },
      },
    }

    const tree = renderer
      .create(<PostTemplate data={data} pageContext={{}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
