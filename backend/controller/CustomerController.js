const { Customer } = require("../model/LoginSignup")

// Save a new customer
const createcustomer = async (req, res) => {
    const {
        fullName,
        address,
        phoneNumber,
        emailAddress,
        companyName,
        industry,
        size,
        location,
        project

    } = req.body;
    try {
        const newCustomer = new Customer({
            fullName,
            address,
            phoneNumber,
            emailAddress,
            companyName,
            industry,
            size,
            location,
            project
        });


        await newCustomer.save(); // Call save on newCustomer object
        res.status(201).json({ message: "Saved" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getcustomer = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;

        const savedCustomers = await Customer.find()
            .sort({ createdAt: -1 }) // Sort in descending order based on the createdAt field
            .limit(limit)
            .skip(skipIndex);

        res.json({
            message: "Customers retrieved successfully",
            customerData: savedCustomers,
            totalPages: Math.ceil(await Customer.countDocuments() / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { emailAddress } = req.params;
        const data = await Customer.findOne({ emailAddress }); // Fix here
        console.log(data);
        const customer = await Customer.findOneAndDelete({ emailAddress }); // Fix here

        if (!customer) {
            console.log("not");
            return res.status(404).json({ message: 'customer not found' });
        }
        res.json({ message: 'customer deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createcustomer, getcustomer, deleteCustomer, updateCustomer };