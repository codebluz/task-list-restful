import bcrypt from 'bcryptjs';

class EncryptServices {
  async encryptPassword(password) {
    const pwd = await bcrypt.hash(password, 8);
    return pwd;
  }

  async comparePassword(password, password_hash) {
    const check = await bcrypt.compare(password, password_hash);
    return check;
  }
}

export default new EncryptServices();
