const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants } = require('../constants')

const endpointSchema = new Schema({
  namespace: {
    type: String,
    required: true
  },
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
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  canBeDeleted: {
    type: Boolean,
    required: true,
    default: true
  }
})

module.exports = mongoose.model(
  'Endpoint',
  endpointSchema,
  dbConstants.COLLECTION_ENDPOINT
)
