import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import Driver from '../models/driverModel.js'
import { generateToken } from '../utils/util.js'

// @desc Register new driver
// @route POST /api/drivers/signup
// @access public
const registerDriver = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, licence } = req.body;

    if(!name || !email || !password || !phoneNumber || !licence ) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Check if driver already exists
    const driverExists = await Driver.findOne({ email });
    if(driverExists) {
        res.status(400);
        throw new Error('Driver already exists');
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create driver
    const driver = await Driver.create({
        name, 
        email, 
        password: hashedPassword,
        phoneNumber,
        licence,
    });

    if(driver) {
        res.status(201).json({
            _id: driver.id,
            name,
            email,
            phoneNumber,
            token: generateToken(driver._id, 'driver')
        });
    } else {
        res.status(400);
        throw new Error('Invalid driver data');
    }
})

// @desc Authenticate a driver
// @route POST /api/drivers/login
// @access public
const loginDriver = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const driver = await Driver.findOne({ email })

    if(driver && (await bcrypt.compare(password, driver.password))) {
        res.status(200).json({
            _id: driver.id,
            name: driver.name,
            email: driver.email,
            phoneNumber: driver.phoneNumber,
            token: generateToken(driver._id, 'driver'),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get driver profile
// @route GET /api/drivers/profile
// @access private
const getDriverProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, phoneNumber, licence } = await Driver.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
        phoneNumber,
        licence,
    })
})


// @desc Logout driver
// @route GET /api/drivers/logout
// @access private
const logoutDriver = asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: '1234'}, process.env.JWT_SECRET, {
        expiresIn: 1,
    })
    res.status(200).json({
        message: 'Driver successfully logged out',
        token,
    })
})

// @desc Get list of all drivers
// @route GET /api/drivers
// @access public
const getDrivers = asyncHandler(async (req, res) => {
    const drivers = await Driver.find()
    if(!drivers) {
        res.status(404)
        throw new Error('No drivers found')
    }
    res.status(200).json(drivers)
})

// @desc 

export {
    registerDriver,
    loginDriver,
    getDriverProfile,
    logoutDriver,
    getDrivers,
}