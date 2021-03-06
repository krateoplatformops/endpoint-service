module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NAMESPACE: process.env.NAMESPACE,
  ARGOCD_URI: process.env.ARGOCD_URI
}
