import mongoose from 'mongoose';
import dbAuth from '../config/dbConfig';

class DatabaseConnection {
  constructor() {
    this.init();
  }

  async init() {
    await mongoose.connect(`YOUR STRING CONNECTION`);
    console.log('Database connect');
  }
}

export default new DatabaseConnection();
