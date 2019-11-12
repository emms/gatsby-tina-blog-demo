import React from 'react'
import { graphql } from 'gatsby'
import { remarkForm } from 'gatsby-tinacms-remark'

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`

export default remarkForm(BlogPostTemplate)
