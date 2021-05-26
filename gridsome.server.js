const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const fetch = require('node-fetch')
const marketSheet = `https://spreadsheets.google.com/feeds/cells/${process.env.MARKET_SHEET}/1/public/full?alt=json`

function stringToCoords (string) {
  return string.split(',').map(i => parseFloat(i))
}

function parseData (data) {
  const obj = data.reduce((prev, curr) => {
    let { row, col, inputValue } = curr.gs$cell
    row = parseInt(row) - 1
    col = parseInt(col)
    if (row === 0) return prev
    if (prev[row]) {
      const newRow = { ...prev[row], [col]: inputValue }
      const newData = {
        ...prev,
        [row]: newRow
      }
      return newData
    } else {
      const newRow = { [row]: { [col]: inputValue } }
      const newData = {
        ...prev,
        ...newRow
      }
      return newData
    }
  }, {})
  return Object.entries(obj).map(([key, value]) => {
    return {
      name: value[3].toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
      category: value[1].toLowerCase(),
      products: value[2].split(',').map(i => i.toLowerCase()),
      contact: value[4],
      order: value[5] === 'TRUE' ? true : false,
      coords: {
        lat: value[6],
        lon: value[7]
      }
    }
  })
}

module.exports = function (api) {
  api.loadSource(async actions => {
    const { addCollection, addMetadata } = actions
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('mapboxAccessToken', process.env.MAPBOX_ACESS_TOKEN || false)
    addMetadata('tileServer', process.env.TILE_SERVER || 'mapbox://styles/mapbox/satellite-streets-v11')
    addMetadata('intranet', process.env.INTRANET || false)
    addMetadata('minZoom', parseFloat(process.env.MAP_MIN_ZOOM) || 15)
    addMetadata('maxZoom', parseFloat(process.env.MAP_MAX_ZOOM) || 18)
    addMetadata('maxCoords', stringToCoords(process.env.MAP_MAX_LONG_LAT))
    addMetadata('minCoords', stringToCoords(process.env.MAP_MIN_LONG_LAT))
    addMetadata('mapCenter', stringToCoords(process.env.MAP_CENTER))
    addMetadata('cobuySheet', `${process.env.COBUY_SHEET}`)
    addMetadata('intranet', {
      isIntranet: process.env.INTRANET === 'true' ? true : false,
      music: process.env.INTRA_MUSIC || false,
      movies: process.env.INTRA_MOVIES || false,
      courses: process.env.INTRA_COURSES || false,
      network: process.env.INTRA_NETWORK || false,
      internet: process.env.INTRA_INTERNET || false,
      apps: process.env.INTRA_APP || false
    })
    // Google Spreadsheet
    try {
      const response = await fetch(marketSheet)
      const data = await response.json()
      const entries = data.feed.entry
      const localMarket = parseData(entries)
      const collection = addCollection({
        typeName: 'MercadoLocal'
      })

      for (const entry of localMarket) {
        collection.addNode(entry)
      }
    } catch (err) {
      console.error(err)
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

  api.chainWebpack((config, { isServer }) => {
    config.plugin('vuetify-loader').use(VuetifyLoaderPlugin)
  })
}
