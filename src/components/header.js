import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'

const StyledHeader = styled.header`
  > h1 {
    margin: 0;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <StyledHeader>
      <h1>
        <StyledLink to="/">{data.site.siteMetadata.title}</StyledLink>
      </h1>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
