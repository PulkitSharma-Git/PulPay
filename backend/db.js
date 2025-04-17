import mongoose from 'mongoose';

await mongoose.connect(); #Add env file
console.log('Connected to MongoDB');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', UserSchema);

export default User;
