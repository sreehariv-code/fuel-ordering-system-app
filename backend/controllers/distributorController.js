import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs'
import Distributor from '../models/distributorModel.js'
import { generateToken } from '../utils/util.js'

const registerDistributor = asyncHandler(async (req, res) => {

})

// @desc Authenticate a distributor
// @route POST /api/distributors/login
// @access public
const loginDistributor = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const distributor = await Distributor.findOne({ email })

    if(distributor && (await bcrypt.compare(password, distributor.password))) {
        res.status(200).json({
            _id: distributor.id,
            name: distributor.name,
            email: distributor.email,
            phoneNumber: distributor.phoneNumber,
            token: generateToken(distributor._id, 'distributor'),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get distributor profile
// @route GET /api/distributors/profile
// @access private
const getDistributorProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, phoneNumber, stationDetails } = await Distributor.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
        phoneNumber,
        stationDetails,
    })
})

// @desc Get fuel details
// @route GET /api/distributors/fuel-info
// @access private
const getFuelInfo = asyncHandler(async (req, res) => {
    // Check for user
    const distributor = await Distributor.findById(req.user.id)
    if(!distributor) {
        res.status(404);
        throw new Error('Distributor not found');
    }

    res.status(200).json({
        fuelTypes: distributor.fuelTypes,
    })
})

// @desc Update fuel details
// @route PATCH /api/distributors/udpate-fuel-info
// @access private
const updateFuelInfo = asyncHandler(async (req, res) => {
    // // Check for user
    // const distributor = await Distributor.findById(req.user.id)
    // if(!distributor) {
    //     res.status(404);
    //     throw new Error('Distributor not found')
    // }

    // const { fuelName, price, available } = req.body
    // const fuelType = distributor.fuelTypes.find(fuelType => fuelType.name === fuelName)
    // fuelType.unitPrice = price
    // fuelType.available = available

    // await distributor.save()
    // // const updatedDistributor = await Distributor.findByIdAndUpdate(req.user.id, { $set: {} }, { new: true });
    // res.status(200).json({
    //     fuelTypes: distributor.fuelTypes,
    // })
})

// @desc Logout distributor
// @route GET /api/distributors/logout
// @access private
const logoutDistributor = asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: '1234'}, process.env.JWT_SECRET, {
        expiresIn: 1,
    })
    res.status(200).json({
        message: 'Distributor successfully logged out',
        token,
    })
})

// @desc Get list of all distributors
// @route GET /api/distributors
// @access public
const getDistributors = asyncHandler(async (req, res) => {
    const distributors = await Distributor.find()
    if(!distributors) {
        res.status(404)
        throw new Error('No distributors found')
    }
    res.status(200).json(distributors)
})

export {
    registerDistributor,
    loginDistributor,
    getDistributorProfile,
    getFuelInfo,
    updateFuelInfo,
    logoutDistributor,
    getDistributors,
}