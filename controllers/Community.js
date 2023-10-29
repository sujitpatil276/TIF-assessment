const Community = require("../models/Community");
const member = require("../models/member");
require("dotenv").config();
const validator = require('validator');

exports.createCommunity = async (req, res) => {
    try {
        const { name } = req.body;

        const userId = req.user.id;

        if (!name) {
            return res.status(403).json({
                success: false,
                message: "Please provide community name",
            });
        };

        if (name.length < 2) {
            return res.status(400).json({
                success: false,
                message:
                    "Community name should be at least 2 characters long. Please try again.",
            });
        }

        // console.log(name);

        const slug = name.toLowerCase();

        const community = await Community.create({
            name: name.toString(),
            slug,
            owner: userId,
        });

        return res.status(200).json({
            status: true,
            content: {
                data: {
                    id: community._id,
                    name: community.name,
                    slug: slug,
                    owner: userId,
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
            message: "Community couldn't be created. Please try again.",
        });
    }
};

exports.getAllCommunities = async (req, res) => {

    try {

        const { pageNo = 0 } = req.body || req.query;

        const limit = 10;

        const totalCommunities = await Community.countDocuments();

        // let totalPages = (totalRoles / limit);
        let totalPages = parseInt(totalCommunities / limit);

        console.log(totalPages);


        if ((totalCommunities % limit) !== 0) {
            totalPages++;
        }

        // if (totalRoles % limit !== 0) {
        //     totalPages += 1;
        // }

        const communities = await Community.find({})
            .sort({ createdAt: -1 })
            .populate("owner")
            .skip(parseInt(pageNo) * parseInt(limit))
            .limit(parseInt(limit));

        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: totalCommunities,
                    pages: totalPages,
                    page: pageNo + 1,
                },
                data: [
                    {
                        communities,
                    }
                ],

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

exports.getAllMembers = async (req, res) => {
    try {

        const communityId = req.params.id;

       

        const { pageNo = 0 } = req.body || req.query;

        const limit = 10;

        const totalmembers = await member.countDocuments();

        let totalPages = parseInt(totalmembers / limit);

        // console.log(totalPages);


        if ((totalmembers % limit) !== 0) {
            totalPages++;
        }

        const members = await member.find({ community: communityId, role: "Community Member" })
            .sort({ createdAt: -1 })
            .populate("owner")
            .skip(parseInt(pageNo) * parseInt(limit))
            .limit(parseInt(limit));


        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: totalmembers,
                    pages: totalPages,
                    page: pageNo + 1,
                },
                data: [
                    {
                        members,
                    }
                ],

            }
        });


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Communities couldn't be found. Please try again.",
        });
    }



};

exports.getMyOwnedCommunity = async (req, res) => {
    try {
        const userId = req.user.id;

        const { pageNo = 0 } = req.body || req.query;

        const limit = 10;

        const totalCommunities = await Community.countDocuments();

        let totalPages = parseInt(totalCommunities / limit);

        // console.log(totalPages);


        if ((totalCommunities % limit) !== 0) {
            totalPages++;
        }

        const communities = await Community.find({ owner: userId })
            .sort({ createdAt: -1 })
            .populate("owner")
            .skip(parseInt(pageNo) * parseInt(limit))
            .limit(parseInt(limit));

        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: totalCommunities,
                    pages: totalPages,
                    page: pageNo + 1,
                },
                data: [
                    {
                        communities,
                    }
                ],

            }
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Communities couldn't be found. Please try again.",
        });
    }

};

exports.getMyJoinedCommunity = (req, res) => {

};



