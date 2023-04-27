import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from './models/userModel.js'

const users = [
    {
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: bcrypt.hashSync('1234567', 10),
        phoneNumber: '9876543210'
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@test.com',
        password: bcrypt.hashSync('12345678', 10),
        phoneNumber: '9871234567'
    },
    {
        name: 'Mary Jane',
        email: 'maryjane@xyz.com',
        password: bcrypt.hashSync('1237894', 10),
        phoneNumber: '9870987543'
    },
    {
        name: 'Henry Williams',
        email: 'henryw@test.com',
        password: bcrypt.hashSync('12309898', 10),
        phoneNumber: '9870987987'
    },
    {
        name: 'Morgan Stanley',
        email: 'morgan@test.com',
        password: bcrypt.hashSync('1230981', 10),
        phoneNumber: '9643176589'
    },
]

const orders = [
    {
        fuelType: 'Petrol',
        fuelAmount: 20,
        status: 'Pending'
    },
    {
        fuelType: 'Diesel',
        fuelAmount: 30,
        status: 'Processing'
    },
    {
        fuelType: 'CNG',
        fuelAmount: 15.5,
        status: 'Delivered'
    },
    {
        fuelType: 'Petrol',
        fuelAmount: 18.25,
        status: 'Processing'
    },
    {
        fuelType: 'Premium petrol',
        fuelAmount: 12,
        status: 'Cancelled'
    },

]

export {users, orders }