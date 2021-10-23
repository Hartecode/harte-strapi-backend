'use strict';

const axios = require("axios");

const pluginId = require("../admin/src/pluginId");

const url = (accountId, projectName) => `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`;

/**
 * cloudflare-publish.js controller
 *
 * @description: A set of functions called "actions" of the `cloudflare-publish` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
  // Check if workflow is in_progress https://docs.github.com/en/rest/reference/actions#list-workflow-runs
  check: async (ctx) => {
    const {
      accountId,
      projectName,
      authEmail,
      authKey
    } = strapi.plugins[pluginId].config;
 
    const headers = {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey,
    };

    const apiUrl = url(accountId, projectName)
    const { data } = await axios.get(
      apiUrl,
      {
        headers,
      }
    );

    const currentDeployment = data.result[0];

    const busy = !(currentDeployment &&  currentDeployment["latest_stage"].name === "deploy");

    ctx.send({ busy, result: currentDeployment });
  },

  publish: async (ctx) => {
    const {
      accountId,
      projectName,
      authEmail,
      authKey
    } = strapi.plugins[pluginId].config;
 
    const headers = {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey,
    };

    const apiUrl = url(accountId, projectName);

    try{
      const { data } = await axios.post(apiUrl, {}, { headers });
      console.log(success, data.result)

      ctx.send({ success: data.success, result: data.result });
    } catch (err) {
      console.log(err)
    }
  
  },
};
