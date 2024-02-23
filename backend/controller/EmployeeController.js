const { Employee } = require("../model/LoginSignup")

// Save a new employee
const createemployee = async (req, res) => {
    const {
        employeename,
        address,
        phoneNumber,
        emailAddress,
        companyName,
        domain,
        wordmode,
        salary,
        location

    } = req.body;
    try {
        const newemployee = new Employee({
            employeename,
            address,
            phoneNumber,
            emailAddress,
            companyName,
            domain,
            wordmode,
            salary,
            location
        });


        await newemployee.save(); // Call save on newemployee object
        res.status(201).json({ message: "Saved" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};


const getemployee = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // get the page number from query params or set it to 1 if it's not provided
        const limit = parseInt(req.query.limit) || 10; // get the number of records per page from query params or set it to 10 if it's not provided
        const skipIndex = (page - 1) * limit; // calculate the index from which to start skipping records

        const savedemployees = await Employee.find().limit(limit).skip(skipIndex);
       console.log(savedemployees);
        res.json({
            message: "employees retrieved successfully",
            employeeData: savedemployees,
            totalPages: Math.ceil(await Employee.countDocuments() / limit), // calculate the total number of pages
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
}

const updateemployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteemployee = async (req, res) => {
    try {
        const { emailAddress } = req.params;
        const data = await Employee.findOne({ emailAddress }); // Fix here
        console.log(data);
        const employee = await Employee.findOneAndDelete({ emailAddress }); // Fix here

        if (!employee) {
            console.log("not");
            return res.status(404).json({ message: 'employee not found' });
        }
        res.json({ message: 'employee deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createemployee, getemployee, deleteemployee, updateemployee };