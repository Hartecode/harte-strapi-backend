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
  async searchPages({ query }) {
    const { page=1, limit=10, parent=null, find:findQuery ='', sort=null } = query
    const sortMethod = {
      NEW: {
        _sort: 'published_at:DESC'
      },
      OlD: {
        _sort: 'published_at:ASC'
      },
      ASC: {
        _sort: 'title:ASC'
      },
      DESC: {
        _sort: 'title:DESC'
      }
    }
    const sortOpt = sort ? sortMethod[sort] : null;
    
    // removing the home page from the search. Search through label and keywords.
    const searchQuery = {
      _where: [
        { homePage: false },
        {
          _or: [
            { label_contains: findQuery },
            { 
              "keywords.wordOrPhrase_contains": findQuery
            }
          ]
        }
      ],
      ...sortOpt
    }

    if (parent) {
      searchQuery._where.push({
        "parent_page.slug": parent
      })
    }

    const totalResults =  await strapi.query('pages').find(searchQuery)
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
  },
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

   async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.pages.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.pages });
  }
};
