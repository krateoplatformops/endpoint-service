const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants } = require('../constants')

const endpointSchema = new Schema({
  secretName: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  headers: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model(
  'Endpoint',
  endpointSchema,
  dbConstants.COLLECTION_ENDPOINT
)