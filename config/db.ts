import mongoose from 'mongoose';
import config from 'config';

export async function connectDB() {
  let DB_URI: string = config.get('mongoURI');
  try {
    await mongoose.connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('DB Connected');
  } catch (error) {
    console.log(error);
  }
}
