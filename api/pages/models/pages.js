'use strict';

async function generateFullPath(data) {
  if (data.slug && !data.homePage) {
    const path = []
    if(data.category) {
      const entity = await strapi.query("category").find({ _id: data.category });
    }
    path.push(data.slug)
    data.path = `/${path.join('/')}`
  } else if (data.homePage) {
    data.path = '/'
  } else {
    data.path = ''
  }
}

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      generateFullPath(data)
    },
    // auto update the path field 
    beforeUpdate: async (params, data) => {
      generateFullPath(data)
    },
  },
};
