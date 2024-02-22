const { User } = require("../model/LoginSignup");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.json({ message: "Email Already Exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const user = new User({
            email: email,
            password: hashpassword
        });
        await user.save();
        res.json({ message: "Registered Successfully" });
    } catch (e) {
        res.json({ message: "Error occurred while signing up" });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Email not exist, Please Signup' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            // Generate a JWT token for the user
            const token = jwt.sign({ _id: user._id }, "secret-key", { expiresIn: '1h' });

            res.status(200).json({ message: 'Logged in Successfully', token, useremail: email });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (e) {
        res.json({ error: e.message || "Error occurred while logging in" });
    }
}

module.exports = { signupUser, loginUser };
