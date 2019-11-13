import React from 'react'
import styled from 'styled-components'
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
      }
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`

export default remarkForm(BlogPostTemplate, BlogPostForm)
