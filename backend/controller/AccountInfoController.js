const { User } = require("../model/LoginSignup")

const createAccount = async (req, res) => {
    try {
        const { email, name, size, location, industry, website, description, logo } = req.body
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            // Update the existing user with the new information
            await User.updateOne({ _id: existingUser._id }, { name, size, location, industry, website, description, logo })
        }
        // Return successful response
        res.json({ message: "Account created successfully" })
    } catch (error) {
        console.error(error)
        res.json({ error: "Server error", message: "Error" })
    }
}
const getAccount = async (req, res) => {
    const { email } = req.query; // Use req.query to access parameters from URL
    console.log(email);
    try {
        const user = await User.findOne({ email });
        console.log(user);
        res.json({ userdata: user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data" });
    }
};


module.exports = { createAccount, getAccount };