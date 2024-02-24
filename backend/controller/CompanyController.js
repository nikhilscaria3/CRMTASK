const { Customer } = require("../model/LoginSignup")

const getcompanies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // get the page number from query params or set it to 1 if it's not provided
        const limit = parseInt(req.query.limit) || 10; // get the number of records per page from query params or set it to 10 if it's not provided
        const skipIndex = (page - 1) * limit; // calculate the index from which to start skipping records

        const savedclientcompanies = await Customer.find()
        .sort({ createdAt: -1 }).limit(limit).skip(skipIndex);
        console.log(savedclientcompanies);
        res.json({
            message: "Companies retrieved successfully",
            companyData: savedclientcompanies,
            totalPages: Math.ceil(await Customer.countDocuments() / limit), // calculate the total number of pages
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching companies", error: error.message });
    }
}

module.exports = {
    getcompanies
}