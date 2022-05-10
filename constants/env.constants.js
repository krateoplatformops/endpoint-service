module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  BRIDGE_URI: process.env.BRIDGE_URI,
  NAMESPACE: process.env.NAMESPACE
}
