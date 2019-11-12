import { createRemarkButton } from 'gatsby-tinacms-remark'
import slugify from 'slugify'

const CreatePostButton = createRemarkButton({
  label: 'Create a new blog post',
  fields: [
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'Lorem Ipsum Dolor Sit Amet',
    },
  ],
  filename: form => {
    const slug = slugify(form.title.toLowerCase())
    return `content/blog/${slug}/index.md`
  },
})

export default CreatePostButton
