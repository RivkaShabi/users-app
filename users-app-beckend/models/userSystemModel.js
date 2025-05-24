const mongoose = require('mongoose');

const UserSystemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // סיסמה מוצפנת
});

const UserSystem = mongoose.model('UserSystem', UserSystemSchema);

module.exports = { UserSystem };
