import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Distributor from '../models/distributorModel.js'
import Driver from '../models/driverModel.js'

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        if(decoded.role === 'user')
            req.user = await User.findById(decoded.id).select('-password')
        else if(decoded.role === 'distributor')
            req.user = await Distributor.findById(decoded.id).select('-password')
        else if(decoded.role === 'driver')
            req.user = await Driver.findById(decoded.id).select('-password')

        req.role = decoded.role
        next()
        } catch(error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const isAuthorizedUser = (roles) => {
    return asyncHandler(async (req, res, next) => {
        if(!req.user || !roles.includes(req.role)) {
            res.status(403)
            throw new Error('Forbidden')
        }
        
        next()
    })
}

export { 
    isAuthenticatedUser,
    isAuthorizedUser,
} 