import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import encryptServices from '../services/encryptServices';
import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Body is invalid' });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const check = await encryptServices.comparePassword(
      password,
      user.password
    );

    if (!check) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    const { id, name } = user;
    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
