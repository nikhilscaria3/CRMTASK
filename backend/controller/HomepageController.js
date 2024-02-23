const { Customer, Complaint } = require("../model/LoginSignup");

const countdata = async (req, res) => {
    try {
        const countofcustomer = await Customer.aggregate([
            {
                $group: {
                    _id: null,
                    countdata: { $sum: 1 },
                },
            },
        ]);

        const countofcomplaint = await Complaint.aggregate([
            {
                $group: {
                    _id: null,
                    countdata: { $sum: 1 },
                },
            },
        ]);

        res.json({
            countofcustomer, countofcomplaint
        });
    } catch (error) {
        console.error('Error counting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { countdata };
