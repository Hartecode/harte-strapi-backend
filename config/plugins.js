module.exports = ({ env }) => ({
  email: {
    provider: 'sendinblue',
    providerOptions: {
        sendinblue_api_key: env('SIB_API_KEY'),
        sendinblue_default_replyto: env('SIB_DEFAULT_REPLY_TO'),
        sendinblue_default_from: env('SIB_DEFAULT_FROM'),
        sendinblue_default_from_name: env('SIB_DEFAULT_FROM_NAME'),
    },
  },
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
  },
  "cloudflare-publish": {
    accountId: env('CLOUDFLARE_ACCOUNT_ID'),
    projectName: env('CLOUDFLARE_PROJECT_NAME'),
    authEmail: env('CLOUDFLARE_AUTH_EMAIL'),
    authKey: env('CLOUDFLARE_AUTH_KEY')
  }
})
 