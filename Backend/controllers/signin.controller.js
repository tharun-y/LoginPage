import Signup from "../models/signup.model.js";

export const getuserid = async (req, res) => {
    const userDetails = req.query; // Use query parameters for GET request

    try {
        if (!userDetails.email || !userDetails.password) {
            return res.status(400).json({ success: false, message: "Please fill out all fields" });
        }

        const user = await Signup.findOne({ email: userDetails.email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.password === userDetails.password) {
            return res.status(200).json({ success: true, data: user });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
