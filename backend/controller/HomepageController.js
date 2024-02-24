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

        const totalRevenue = await Customer.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$projectcost" }
                },
            },
        ]);

        const revenuedata = totalRevenue.map((data, index) => {
            return data.totalRevenue
        })

        console.log(Number(revenuedata));
        res.json({
            countofcustomer, countofcomplaint, totalRevenue: Number(revenuedata)
        });
    } catch (error) {
        console.error('Error counting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { countdata };
