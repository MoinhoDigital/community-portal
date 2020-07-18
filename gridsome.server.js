const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = function (api) {
  api.loadSource(({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('tileServer', process.env.TILE_SERVER)
    addMetadata('notLocal', process.env.NOT_LOCAL || false)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin)
  })
}
