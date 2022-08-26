const express = require('express');
const router = express.Router();

module.exports = (app, config) => {
  router.use(`/${config.common.cmsApi}`, require('./cms')(app, config))
  return router
}
