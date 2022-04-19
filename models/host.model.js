const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { dbConstants } = require('../constants')

const hostSchema = new Schema({
  provider: {
    type: String,
    required: true
  },
  secretName: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  apiUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Host', hostSchema, dbConstants.COLLECTION_HOST)
