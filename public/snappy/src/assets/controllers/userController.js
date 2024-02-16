const bcrypt = require('bcrypt');
const User = require('./models/User');

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already exists", status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already exists", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();
        return res.json({ status: true, msg: "User created successfully" });
    } catch (error) {
        console.error("Error while registering:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ status: false, msg: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ status: false, msg: 'Incorrect username or wrong password' });

        return res.json({ status: true, msg: "User logged in successfully" });
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
