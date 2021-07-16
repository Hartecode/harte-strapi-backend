'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Adds Contact Message to database and send email out
 * (https://strapi.io/documentation/developer-docs/latest/guides/send-email.html#introduction)
 * to customize this controller
 */

module.exports = {
  async sendMsg(ctx) {
    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services['contact-message'].create(data, { files });
    } else {
      entity = await strapi.services['contact-message'].create(ctx.request.body);
    }

    entity = sanitizeEntity(entity, { model: strapi.models['contact-message'] });

    const toEmail = ctx.request.body.email;

    try {
      await strapi.plugins['email-designer'].services.email.sendTemplatedEmail(
        {
          to: toEmail, // required
          from: 'no-reply@hartecode.com', // optional if /config/plugins.js -> email.settings.defaultFrom is set
          attachments: [], // optional array of files
        },
        {
          templateId: '60ee7424671d125231154abf', // required - you can get the template id from the admin panel
        },
        {
          // this object must include all variables you're using in your email template
          ...entity
        }
      );
    } catch (err) {
      strapi.log.debug('📺: ', err);
      return ctx.badRequest(null, err);
    }

    return entity;
  }
};
