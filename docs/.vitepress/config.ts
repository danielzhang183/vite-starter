import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Web Notes',
  lastUpdated: true,
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/typescript/': sidebarTypescript(),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/danielzhang183' },
    ],
    editLink: {
      pattern: 'git+https://github.com/danielzhang183/vite-starter/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Dylan Zhang',
    },
  },
})

function nav() {
  return [
    { text: 'Typescript', link: '/typescript/index', activeMatch: '/typescript/' },
  ]
}

function sidebarTypescript() {
  return [
    {
      text: 'Typscript',
      collapsible: true,
      items: [
        { text: 'Challenges', link: '/typescript/challenges' },
        { text: 'Tricks', link: '/typescript/tricks' },
      ],
    },
  ]
}
