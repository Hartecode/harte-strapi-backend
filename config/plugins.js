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
    breakpoints: {
      xxlarge: 1920,
      xlarge: 1440,
      large: 1280,
      medium: 1024,
      small: 768,
      xsmall: 414,
      largeIcon: 512,
      mediumIcon: 192,
      smallIcon: 72
    }
  }
})
 