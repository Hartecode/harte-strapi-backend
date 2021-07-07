'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Custom search of pages
   * @param {*} ctx 
   * @returns {Promise}
   */
  async searchPages(ctx) {
    const page = ctx.query.page && !isNaN(ctx.query.page) ? ctx.query.page : 1
    const limit = ctx.query.limit && !isNaN(ctx.query.limit) ? ctx.query.limit : 10
    // removing the home page from the search. Search through label and keywords.
    const query = {
      _where: [
        { homePage: false },
        {
          _or: [
            { label_contains: ctx.query.find },
            { 
              "keywords.wordOrPhrase_contains": ctx.query.find 
            }
          ]
        }
      ]
    }

    const totalResults =  await strapi.query('pages').find(query)
    const totalPages = Math.ceil(totalResults.length / limit)
    const results = totalResults.slice(limit * (page - 1), limit * page).map(entity => sanitizeEntity(entity, { 
      model: strapi.models.pages 
    }));

    return {
      page,
      totalPages,
      totalResults: totalResults.length,
      pageLimit: limit,
      results
    };
  }
};
