import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'reezakim/infra-learning-web',
  },
  collections: {
    learning: collection({
      label: 'Learning Labs',
      slugField: 'title',
      path: 'src/content/learning/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Article Title' } }),
        description: fields.text({ label: 'Short Summary / Meta Description' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Linux Server', value: 'linux' },
            { label: 'Networking & Security', value: 'networking' },
            { label: 'Docker & Containers', value: 'docker' },
            { label: 'Cloud & Infrastructure', value: 'cloud' },
          ],
          defaultValue: 'linux',
        }),
        pubDate: fields.date({ label: 'Publish Date' }),
        featured: fields.checkbox({ label: 'Featured Article on Home', defaultValue: false }),
        content: fields.markdoc({ label: 'Content (Markdown/Markdoc Editor)' }),
      },
    }),
  },
});