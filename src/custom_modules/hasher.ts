const hash = require('hash.js');
const bcrypt = require('bcryptjs');

export const hasher = (data: string) => {
  const initialDigest = hash.sha256().update(data).digest('hex');
  const secondDigest = hash.sha256().update(initialDigest).digest('hex');
  const thirdDigest = hash.sha256().update(secondDigest).digest('hex');
  const fourthDigest = hash.sha256().update(thirdDigest).digest('hex');
  const lastDigest = hash.sha256().update(fourthDigest).digest('hex');

  return lastDigest;
};

export const salter = (hash: string) => bcrypt.hashSync(hash, 10);
