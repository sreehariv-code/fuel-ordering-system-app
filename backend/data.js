import bcrypt from 'bcryptjs'

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

const distributors = [
    {
        name: 'Steve Smith',
        email: 'stevesmith@test.com',
        password: bcrypt.hashSync('123456789', 10),
        phoneNumber: '9879876123',
        fuelTypes: [
            {
                name: 'Petrol',
                unitPrice: '108.67',
                available: true
            },
            {
                name: 'Diesel',
                unitPrice: '103.54',
                available: true
            },
        ],
        stationDetails: {
            stationName: 'Hilltop fuels',
            licenceNumber: 'XAD2345678',
            address: '123 Street'
        },
        online: true,
    },
    {
        name: 'Annie Jones',
        email: 'anniejs@test.com',
        password: bcrypt.hashSync('12309845', 10),
        phoneNumber: '9753186420',
        fuelTypes: [
            {
                name: 'Petrol',
                unitPrice: '108.45',
                available: true,
            },
            {
                name: 'Diesel',
                unitPrice: '103.20',
                available: true,
            },
            {
                name: 'Premium petrol',
                unitPrice: '116.15',
                available: true,
            },
        ],
        stationDetails: {
            stationName: 'Jones Fuels',
            licenceNumber: 'XCS34512345',
            address: '25 B Street',
        },
        online: true,
    },
    {
        name: 'Cory James',
        email: 'cjames@test.com',
        password: bcrypt.hashSync('1231239', 10),
        phoneNumber: '9078563412',
        fuelTypes: [
            {
                name: 'Petrol',
                unitPrice: '108.67',
                available: true,
            },
            {
                name: 'Diesel',
                unitPrice: '103.54',
                available: false,
            },
            {
                name: 'CNG',
                unitPrice: '98.92',
                available: true,
            },
        ],
        stationDetails: {
            stationName: 'Star fuels',
            licenceNumber: 'YCD1029384',
            address: '12 C Street'
        },
        online: false,
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

export {
    users, 
    orders,
    distributors,
}