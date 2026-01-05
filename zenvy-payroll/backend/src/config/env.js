
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'zenvy_super_secret_key',
  JWT_EXPIRES_IN: '1d',
  SALT_ROUNDS: 10
};
