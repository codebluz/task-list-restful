import * as Yup from 'yup';
import encryptServices from '../services/encryptServices';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Body request is invalid' });
    }

    const { name, email } = req.body;
    let { password } = req.body;
    password = await encryptServices.encryptPassword(password);

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json({ id: user._id, name, email });
  }
}

export default new UserController();
