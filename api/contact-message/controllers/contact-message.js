'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
// const Filter = require('bad-words');
// const filter = new Filter();

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
    const subject = ctx.request.body.subject;
    // send an email by using the email plugin
    await strapi.plugins['email'].services.email.send({
      to: toEmail,
      from: 'no-reply@hartecode.com',
      subject: `Message: ${subject}`,
      text: `
        Message #${entity.id}.

        Comment:
        ${entity.message}
      `,
    });

    return entity;
  }
};
