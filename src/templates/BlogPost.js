import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import { remarkForm } from 'gatsby-tinacms-remark'
import Header from 'components/Header'

const StyledBlogPostTempalte = styled.div`
  padding: 50px;
`

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <StyledBlogPostTempalte>
      <Header />
      <Link to="/">Back</Link>
      {frontmatter.hero_image && (
        <Img fluid={frontmatter.hero_image.childImageSharp.fluid} />
      )}
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </StyledBlogPostTempalte>
  )
}

const BlogPostForm = {
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      component: 'text',
    },
    {
      label: 'Hero Image',
      name: 'rawFrontmatter.hero_image',
      component: 'image',
      parse: filename => `/content/assets/${filename}`,
      uploadDir: () => '/content/assets/',
      previewSrc: markdownRemark => {
        if (!markdownRemark.frontmatter.hero_image) return ''
        return markdownRemark.frontmatter.hero_image.childImageSharp.fluid.src
      },
    },
    {
      label: 'Content',
      name: 'rawMarkdownBody',
      component: 'markdown',
      description: 'Edit the body of the post here',
    },
  ],
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        hero_image {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
    allImageSharp {
      edges {
        node {
          fluid {
            src
            originalName
          }
        }
      }
    }
  }
`

export default remarkForm(BlogPostTemplate, BlogPostForm)
