import mongoose from 'mongoose';

async function main() {
    await mongoose.connect('mongodb+srv://pulkit:Pulkit%40124@cluster0.0ne5n.mongodb.net/SecondBrain');
    console.log('Connected to MongoDB');
}

main().catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', UserSchema);

export default User;