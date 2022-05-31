const mongoose = require('mongoose')
const { envConstants } = require('../constants')
const Endpoint = mongoose.model('Endpoint')
const { logger } = require('../helpers/logger.helpers')
const timeHelpers = require('../helpers/time.helpers')
const uriHelpers = require('../helpers/uri.helpers')

const initArgocd = async () => {
  const argocdSvc = `http://argocd-server.${envConstants.NAMESPACE}.svc/api/v1/applications`
  Endpoint.find({
    name: 'argocd',
    target: argocdSvc
  })
    .then((endpoints) => {
      if (endpoints.length === 0) {
        logger.info('Default argocd endpoint not found, creating...')

        const parsed = uriHelpers.parse(argocdSvc)

        const argocdEndpoint = new Endpoint({
          namespace: envConstants.NAMESPACE,
          secretName: 'krateo-dashboard-argocd-token',
          icon: 'fa-solid fa-truck',
          name: 'argocd',
          type: 'argocd',
          domain: parsed.domain,
          target: argocdSvc,
          category: 'delivery',
          createdAt: timeHelpers.currentTime(),
          canBeDeleted: false
        })
        argocdEndpoint.save()
        logger.info('Default argocd endpoint created')
      }
    })
    .catch((err) => {
      logger.error(err)
    })
}

module.exports = initArgocd
