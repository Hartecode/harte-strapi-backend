'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Promise to fetch all static paths for nextjs static build
   * https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
   *
   * @return {Promise}
   */
   async find(ctx) {
    const entities = await strapi.services.pages.find();
    const paths = entities.map(page => ({
      params: page.static_path
    }))

    return paths
  },
};
