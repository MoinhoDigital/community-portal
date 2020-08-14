const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

function stringToCoords (string) {
  return string.split(',').map(i => parseFloat(i))
}

module.exports = function (api) {
  api.loadSource(({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('tileServer', process.env.TILE_SERVER)
    addMetadata('notLocal', process.env.NOT_LOCAL || false)
    addMetadata('minZoom', parseInt(process.env.MAP_MIN_ZOOM) || 15)
    addMetadata('maxZoom', parseInt(process.env.MAP_MAX_ZOOM) || 19)
    addMetadata('maxCoords', stringToCoords(process.env.MAP_MAX_LONG_LAT))
    addMetadata('minCoords', stringToCoords(process.env.MAP_MIN_LONG_LAT))
    addMetadata('mapCenter', stringToCoords(process.env.MAP_CENTER))
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin)
  })
}
