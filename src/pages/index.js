import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { withPlugin } from 'react-tinacms'
import Img from 'gatsby-image'
import SEO from 'components/seo'
import Header from 'components/Header'
import CreatePostButton from 'tina-plugins/CreatePostButton'

const Container = styled.div`
  padding: 50px;
`

const Posts = styled.div`
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
`

const PostLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

const StyledImage = styled(Img)`
  height: 350px;
`

const ImagePlaceholder = styled.div`
  height: 350px;
  background-color: #f5f5f5;
`

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Container>
      <SEO title="Home" />
      <Header />
      <Posts>
        {posts.map(({ node }) => (
          <PostLink to={node.fields.slug} key={node.id}>
            {node.frontmatter.hero_image ? (
              <StyledImage
                fluid={node.frontmatter.hero_image.childImageSharp.fluid}
              />
            ) : (
              <ImagePlaceholder />
            )}
            <h3>{node.frontmatter.title || node.fields.slug}</h3>
            <p>{node.frontmatter.date}</p>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </PostLink>
        ))}
      </Posts>
    </Container>
  )
}

export const pageQuery = graphql`
  query IndexPageQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY HH:mm")
            hero_image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default withPlugin(IndexPage, CreatePostButton)
