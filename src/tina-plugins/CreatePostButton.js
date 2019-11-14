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
  ],
  filename: form => {
    const slug = form.title.replace(/\s+/, '-').toLowerCase()
    return `content/blog/${slug}/index.md`
  },
  frontmatter: form => ({
    title: form.title,
    date: new Date(),
  }),
})

export default CreatePostButton
