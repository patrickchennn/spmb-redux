const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[database-OK] MongoDB Connected to: ${conn.connection.host}, port:${conn.connection.port}, database name:${conn.connection.name}`.green);
  } catch (error) {
    console.log("[database-NOT OK]: ".red,error);
    process.exit(1);
  }
};

module.exports = connectDB;