const Role = require("../models/Role");
require("dotenv").config();
const validator = require('validator');

exports.createRoll = async (req, res) => {
    try {
        const {name} = req.body;

        if (!name) {
            return res.status(403).json({
                success: false,
                message: "Please provide role name",
            });
        }

        if (name.length < 2) {
            return res.status(400).json({
                success: false,
                message:
                    "Role name should be at least 2 characters long. Please try again.",
            });
        }

        // console.log(name);

        const role = await Role.create({
            name: name.toString(),
        });

        return res.status(200).json({
            status: true,
            content: {
                data: {
                    id: role._id,
                    name: role.name,
                    created_at: role.createdAt,
                    updated_at: role.updatedAt,
                }
            }
        });


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Role couldn't be created. Please try again.",
        });
    }
};

exports.getAllRoles = async (req, res) => {

    try {
        // const roles = Role.find({});

        // console.log("Sujit");

        const { pageNo = 0 } = req.body || req.query;

        const limit = 10;

        const totalRoles = await Role.countDocuments();

        // let totalPages = (totalRoles / limit);
        let totalPages = parseInt(totalRoles / limit);

        console.log(totalPages);


        if ((totalRoles % limit) !== 0) {
            totalPages++;
        }

        // if (totalRoles % limit !== 0) {
        //     totalPages += 1;
        // }

        const roles = await Role.find({})
            .sort({ createdAt: -1 })
            .skip(parseInt(pageNo) * parseInt(limit))
            .limit(parseInt(limit));

        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: totalRoles,
                    pages: totalPages,
                    page: pageNo + 1,
                },
                data: roles,

            }
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Role couldn't be found. Please try again.",
        });
    }
};