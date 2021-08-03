'use strict';

async function generateFullPath(data) {
  const staticPath = {
    slug: []
  }

  if (data.slug && !data.homePage) {
    let parentPath = ''
    if(data.parent_page) {
      const parentPage = await strapi.query("pages").findOne({ id: data.parent_page })
      parentPath = parentPage.path
      if (parentPage.slug) staticPath.slug.push(parentPage.slug)
    }
    staticPath.slug.push(data.slug)
    data.static_path = staticPath
    data.path = `${parentPath}/${data.slug}`
  } else if (data.homePage) {
    staticPath.slug.push('')
    data.path = '/'
    data.static_path = staticPath

  }
  return data
}

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      data = await generateFullPath(data)
    },
    // auto update the path field 
    beforeUpdate: async (params, data) => {
      data = await generateFullPath(data)
    },
  },
};
