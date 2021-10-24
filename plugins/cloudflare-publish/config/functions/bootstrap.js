const pluginId = require('../../admin/src/pluginId');

// https://forum.strapi.io/t/managing-admin-permissions-for-custom-local-plugins/1784
const registerPermissionActions = async () => {
    const actions = {
            section: 'plugins',
            displayName: 'Cloudflare Plugin',//'<display name of the plugin>',
            uid: 'read',
            pluginName: pluginId,
        }
    ;

    const { actionProvider } = strapi.admin.services.permission;
    await actionProvider.register(actions);
    // await strapi.admin.services.permission.actionProvider.registerMany(actions)
}

module.exports = async () => {

    // set plugin store
    
    await registerPermissionActions();
    
};