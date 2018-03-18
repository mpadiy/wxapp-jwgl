import { Base64 } from './base64.js';
const getUserKey = (id, password) =>
{
  return Base64.encode(id) + '%%%' + Base64.encode(password);
}

module.exports = {
  getUserKey: getUserKey
}
