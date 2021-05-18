// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  icon: './static/images/favicon.png',
  siteName: process.env.SITE_NAME,
  siteDescription: process.env.SITE_DESCRIPTION,
  tileServer: process.env.SITE_DESCRIPTION || `http://localhost:3000`,
  templates: {
    // Place: '/:nome',
    Post: '/:title',
    Tag: '/tag/:id',
    Produto: '/produto/:id',
    Compra: '/compra/:id'
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Produto',
        path: 'conteudo/produto/*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Compra',
        path: 'conteudo/compra/*.md',
      }
    },
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'conteudo/jornal/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Lugar',
        path: 'conteudo/lugares/*.md',
        refs: {
          categorias: {
            typeName: 'Categoria',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'App',
        path: 'conteudo/apps/*.md',
        refs: {
          categorias: {
            typeName: 'Categoria',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Sobre',
        path: 'conteudo/sobre.md'
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: ['@gridsome/remark-prismjs']
    }
  }
}
