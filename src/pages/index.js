import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { withPlugin } from 'react-tinacms'
import SEO from 'components/seo'
import Header from 'components/Header'
import CreatePostButton from 'tina-plugins/CreatePostButton'

const Container = styled.div`
  display: grid;
  padding: 50px;
`

const Posts = styled.div`
  padding: 50px 0;
`

const Post = styled.div`
  padding-bottom: 20px;
`

const PostLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Container>
      <SEO title="Home" />
      <Header />
      <Posts>
        {posts.map(({ node }) => (
          <Post key={node.id}>
            <h3>
              <PostLink to={node.fields.slug}>
                {node.frontmatter.title || node.fields.slug}
              </PostLink>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Post>
        ))}
      </Posts>
    </Container>
  )
}

export const pageQuery = graphql`
  query IndexPageQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default withPlugin(IndexPage, CreatePostButton)
