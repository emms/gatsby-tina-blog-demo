import get from 'lodash.get'
import { createRemarkButton } from 'gatsby-tinacms-remark'

const CreatePostButton = createRemarkButton({
  label: 'Create a new blog post',
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'Lorem Ipsum Dolor Sit Amet',
      required: true,
    },
    {
      name: 'hero_image',
      label: 'Hero image',
      component: 'image',
      parse: filename => `/content/assets/${filename}`,
      previewSrc: (formValues, { input }) => {
        const path = input.name.replace('rawFrontmatter', 'frontmatter')
        const gatsbyImageNode = get(formValues, path)
        if (!gatsbyImageNode) return ''
        //specific to gatsby-image
        return gatsbyImageNode //.childImageSharp.fluid.src
      },
      uploadDir: () => {
        return '/content/assets/'
      },
    },
  ],
  filename: form => {
    const slug = form.title.replace(/\s+/, '-').toLowerCase()
    return `content/blog/${slug}/index.md`
  },
  frontmatter: form => ({
    title: form.title,
    date: new Date(),
    hero_image: form.hero_image,
  }),
})

export default CreatePostButton
