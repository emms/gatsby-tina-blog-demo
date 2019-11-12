import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { withPlugin } from 'react-tinacms'
import SEO from 'components/seo'
import Header from 'components/Header'
import CreatePostButton from 'tina-plugins/CreatePostButton'

const Container = styled.div`
  display: grid;
  padding: 50px;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Container>
      <SEO title="Home" />
      <Header />
      {posts.map(({ node }) => (
        <>
          <h3>{node.frontmatter.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </>
      ))}
    </Container>
  )
}

export const pageQuery = graphql`
  query IndexPageQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`

export default withPlugin(IndexPage, CreatePostButton)
