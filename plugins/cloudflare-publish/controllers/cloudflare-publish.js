'use strict';

const axios = require("axios");

const pluginId = require("../admin/src/pluginId");

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
    const { owner, repo, workflow_id, token, branch } = strapi.plugins[
      pluginId
    ].config;

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token " + token,
    };

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs?branch=${branch}`;
    const { data: inProgressData } = await axios.get(
      `${url}&status=in_progress`,
      {
        headers,
      }
    );
    const { data: queuedData } = await axios.get(`${url}&status=queued`, {
      headers,
    });
    const busy = !!(inProgressData.total_count + queuedData.total_count);

    ctx.send({ busy });
  },

  publish: async (ctx) => {
    console.log(pluginId)
    const {
      accountId,
      projectName,
      authEmail,
      authKey
    } = strapi.plugins[pluginId].config;
    console.log({
      accountId,
      projectName,
      authEmail,
      authKey
    });
    const headers = {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey,
    };


    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`;
    const { success, result } = await axios.post(url, { headers });
    console.log(success, result)

    ctx.send({ success, result });
  },
};
