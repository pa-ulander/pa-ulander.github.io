import React from 'react'
import Layout from '../Layout'
import BlogPostList from '../BlogPostList'
import SEO from '../Seo'

const Home = ({ data }) => {
  console.log('home data', data)

  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout>
      <SEO title={siteTitle} description={siteDescription} />
      <BlogPostList data={data.allMdx.nodes} />
    </Layout>
  )
}

export default Home
