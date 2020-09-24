const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const fetch = require('node-fetch')
const docsP1 =
  'https://spreadsheets.google.com/feeds/cells/1UZHuELHbtkZvNEa_yCaiCFJzPKD9G0tYuJ9TqHVVOGE/1/public/full?alt=json'
const docsP2 =
  'https://spreadsheets.google.com/feeds/cells/1UZHuELHbtkZvNEa_yCaiCFJzPKD9G0tYuJ9TqHVVOGE/2/public/full?alt=json'

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
      contact: value[4]
    }
  })
}

module.exports = function (api) {
  api.loadSource(async actions => {
    const { addCollection, addMetadata } = actions
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('tileServer', process.env.TILE_SERVER)
    addMetadata('notLocal', process.env.NOT_LOCAL || false)
    addMetadata('minZoom', parseInt(process.env.MAP_MIN_ZOOM) || 15)
    addMetadata('maxZoom', parseInt(process.env.MAP_MAX_ZOOM) || 19)
    addMetadata('maxCoords', stringToCoords(process.env.MAP_MAX_LONG_LAT))
    addMetadata('minCoords', stringToCoords(process.env.MAP_MIN_LONG_LAT))
    addMetadata('mapCenter', stringToCoords(process.env.MAP_CENTER))
    // Google Spreadsheet
    try {
      const response = await fetch(docsP1)
      const data = await response.json()
      const entries = data.feed.entry
      const people = parseData(entries)
      const collection = addCollection({
        typeName: 'People'
      })

      for (const person of people) {
        collection.addNode(person)
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
