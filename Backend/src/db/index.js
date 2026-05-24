import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);

    const db = mongoose.connection.db;
    try {
      const indexInfo = await db.collection('users').indexInformation();
      if (indexInfo.username_1) {
        await db.collection('users').dropIndex('username_1');
        console.log('Dropped stale username_1 index from users collection');
      }
    } catch (indexErr) {
      if (indexErr.codeName !== 'IndexNotFound' && indexErr.codeName !== 'NamespaceNotFound') {
        console.warn('Unable to inspect/drop stale username_1 index:', indexErr.message);
      }
    }

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}


export default connectDB