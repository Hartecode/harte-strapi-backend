'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  '*/1 * * * *': async () => {
    console.log('running');
    //fetch articles to publish
    const draftArticleToPublish = await strapi.api.pages.services.pages.find({
      published_at: null, 
      // schedule_publish_at_null: true,      // so we add another condition here to filter entries that have not been published
      // schedule_publish_at_lt: new Date(),
    });

    console.log(draftArticleToPublish);

    // // update published_at of articles
    // await Promise.all(draftArticleToPublish.map(page => {
    //   return strapi.api.pages.services.pages.update(
    //     { id: page.id },
    //     { schedule_published_at: new Date() }
    //   );
    // }));
  },
};
