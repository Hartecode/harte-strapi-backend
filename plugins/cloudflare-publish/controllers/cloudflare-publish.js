'use strict';

const axios = require("axios");

const pluginId = require("../admin/src/pluginId");

const url = (accountId, projectName) => `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`;
const dateTime = (rawDate) => {
  const date = new Date(rawDate);
  // get the date as a string
  const cleanDate = date.toDateString();
  // get the time as a string
  const time = date.toLocaleTimeString();
  return {
    date: cleanDate,
    time
  }
}

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

    try {
      const apiUrl = url(accountId, projectName)
      const { data } = await axios.get(
        apiUrl,
        {
          headers,
        }
      );
      const currentDeployment = data.result[0];
      const busy = !(currentDeployment &&  currentDeployment["latest_stage"].name === "deploy");
      let deploy = null;

      if (currentDeployment) {
        const rawDate = currentDeployment["latest_stage"].ended_on;
        const { date, time } = dateTime(rawDate);
        deploy = {
          status: currentDeployment["latest_stage"].status,
          shortId: currentDeployment.short_id,
          siteUrl: currentDeployment.aliases ? currentDeployment.aliases[0] : `https://${currentDeployment.project_name}.pages.dev`,
          previewURl: currentDeployment.url,
          deploymentTime: {
            raw: currentDeployment.latest_stage.ended_on,
            date,
            time
          }
        };
      }

      ctx.send({
        numberOfDeploys: data['result_info']['total_count'],
        busy,
        status: currentDeployment.latest_stage.name,
        deploy
      });
    } catch(e) {
      ctx.send({
        status: 'failed',
      })
    }
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
  
      ctx.send({ success: data.success, result: data.result });
    } catch (err) {
      console.log(err)
      ctx.send({ success: 'failed' });
    }
  
  },
};
