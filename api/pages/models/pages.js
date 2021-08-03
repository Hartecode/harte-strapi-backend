'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    // auto update the path field 
    async beforeUpdate(params, data) {
      if (data.slug && !data.homePage) {
        const path = []
        if(data.category) {
          const entity = await strapi.services.category.find({ _id: data.category });
        }
        path.push(data.slug)
        data.path = `/${path.join('/')}`
      } else if (data.homePage) {
        data.path = '/'
      } else {
        data.path = ''
      }
    },
  },
};
