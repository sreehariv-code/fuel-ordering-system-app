import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs'
import Distributor from '../models/distributorModel.js'
import { generateToken } from '../utils/util.js'

// @desc Register new distributor
// @route POST /api/distributors/signup
// @access public
const registerDistributor = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, stationDetails } = req.body;

    if(!name || !email || !password || !phoneNumber || !stationDetails) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // Check if distributor already exists
    const distributorExists = await Distributor.findOne({ email });
    if(distributorExists) {
        res.status(400);
        throw new Error('Distributor already exists');
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create distributor
    const distributor = await Distributor.create({
        name, 
        email, 
        phoneNumber,
        password: hashedPassword,
        stationDetails,
    });

    if(distributor) {
        res.status(201).json({
            _id: distributor.id,
            name,
            email,
            phoneNumber,
            token: generateToken(distributor._id, 'distributor')
        });
    } else {
        res.status(400);
        throw new Error('Invalid distributor data');
    }
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
    const { _id, name, email, phoneNumber, stationDetails, online } = await Distributor.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
        phoneNumber,
        stationDetails,
        online,
    })
})

// @desc Update distributor profile
// @route PATCH /api/distributors/update-profile
// @access private
const updateDistributorProfile = asyncHandler(async (req, res) => {
    // Check for distributor
    const distributor = await Distributor.findById(req.user.id)
    if(!distributor) {
        res.status(404);
        throw new Error('Distributor not found');
    }

    const updates = req.body;
    const updatedDistributor = await Distributor.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true });
    res.status(200).json({
        id: updatedDistributor.id,
        name: updatedDistributor.name,
        email: updatedDistributor.email,
        phoneNumber: updatedDistributor.phoneNumber,
        stationDetails: updatedDistributor.stationDetails,
        online: updatedDistributor.online,
    })
})

// @desc Get fuel details
// @route GET /api/distributors/fuel-info
// @access private
const getFuelInfo = asyncHandler(async (req, res) => {
    // Check for distributor
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
    // Check for distributor
    const distributor = await Distributor.findById(req.user.id)
    if(!distributor) {
        res.status(404);
        throw new Error('Distributor not found')
    }

    const { fuelName, price, available } = req.body
    const fuelType = distributor.fuelTypes.find(fuelType => fuelType.name === fuelName)
    console.log(fuelType)
    fuelType.unitPrice = price
    fuelType.available = available
    await distributor.save()

    res.status(200).json({
        fuelTypes: distributor.fuelTypes,
    })
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

// Function to calculate 3-D distance between two points using Haversine formula
const getDistance = (lat1, lon1, lat2, lon2) => {
    // approximate radius of earth in km
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}

// Function to sort destinations by distance
const sortDestinationsByDistance = (sourceLat, sourceLon, destinations, radius) => {
    const destinationsWithDistance = destinations.map(destination => {
        const distance = getDistance(sourceLat, sourceLon, destination.location.latitude, destination.location.longitude)

        return { ...destination, distance }
    })

    const sortedDestinations = destinationsWithDistance.sort((a, b) => a.distance - b.distance)
    const nearbyDestinations = sortedDestinations.filter(destination => destination.distance <= radius)
    return nearbyDestinations;
}

// @desc Get list of all distributors within a specified radius
// @route GET /api/distributors/:radius
// @access private
const getNearbyDistributors = asyncHandler(async (req, res) => {
    const { radius } = req.params
    const distributors = await Distributor.find().select('-password')
    if(!distributors) {
        res.status(404)
        throw new Error('No distributors found')
    }
    const destinations = distributors.map(distributor => ({id: distributor._id, location: distributor.location}))
    const { latitude, longitude } = req.user.location

    const sortedDestinations = sortDestinationsByDistance(latitude, longitude, destinations, radius)
    
    const sortedDistributors = sortedDestinations.map((destination) => {
        const distributor = distributors.find(distributor => distributor._id === destination.id)
        return { distributor, distance: destination.distance }
    })
    if(!sortedDistributors) {
        res.status(404)
        throw new Error('No distributors found within the specified range')
    }

    res.status(200).json(sortedDistributors)
})

export {
    registerDistributor,
    loginDistributor,
    getDistributorProfile,
    updateDistributorProfile,
    getFuelInfo,
    updateFuelInfo,
    logoutDistributor,
    getDistributors,
    getNearbyDistributors,
}