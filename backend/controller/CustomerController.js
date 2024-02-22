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
        location

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
            location
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
      const page = parseInt(req.query.page) || 1; // get the page number from query params or set it to 1 if it's not provided
      const limit = parseInt(req.query.limit) || 10; // get the number of records per page from query params or set it to 10 if it's not provided
      const skipIndex = (page - 1) * limit; // calculate the index from which to start skipping records
  
      const savedCustomers = await Customer.find().limit(limit).skip(skipIndex);
      res.json({
        message: "Customers retrieved successfully",
        customerData: savedCustomers,
        totalPages: Math.ceil(await Customer.countDocuments() / limit), // calculate the total number of pages
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
  }

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
        const { email } = req.body;
        const data = await Customer.findOne({ email }); // Fix here
        console.log(data);
        const customer = await Customer.findOneAndDelete({ email }); // Fix here

        if (!customer) {
            console.log("not");
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createcustomer, getcustomer, deleteCustomer, updateCustomer };