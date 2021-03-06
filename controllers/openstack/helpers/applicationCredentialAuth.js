const axios = require('axios');

const identityUrl = process.env.OPENSTACK_IDENTITY_URL;

const applicationCredentialAuth = async (id, secret) => {
  const config = {
    method: 'post',
    url: `${identityUrl}/auth/tokens`,
    data: {
      auth: {
        identity: {
          methods: ['application_credential'],
          application_credential: {
            id,
            secret,
          },
        },
      },
    },
  };
  const response = await axios(config);
  return response;
};

module.exports = applicationCredentialAuth;
