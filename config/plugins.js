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
    accountId: 'f83f709cf7f075256fe184708fc04aaa',
    projectName: 'next-strapi-frontend',
    authEmail: 'hartecode@gmail.com',
    authKey: 'fd1269d18eff376f8c303dc58c091c076ff7f'
  }
})
 