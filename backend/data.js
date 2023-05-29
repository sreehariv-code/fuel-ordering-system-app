import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: bcrypt.hashSync('1234567', 10),
        phoneNumber: '9876543210',
        location: {
            latitude: 9.253207,
            longitude: 76.824738,
        }
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
        location: {
            latitude: 9.265919,
            longitude: 76.806970,
        },
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
        location: {
            latitude: 9.267508,
            longitude: 76.790877,
        },
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
        location: {
            latitude: 9.264616,
            longitude: 76.778048,
        },
    },
    {
        name: 'Henry Trump',
        email: 'henrytrump@test.com',
        password: bcrypt.hashSync('2143658', 10),
        phoneNumber: '9102834756',
        fuelTypes: [
            {
                name: 'Petrol',
                unitPrice: '108.67',
                available: true
            },
            {
                name: 'Diesel',
                unitPrice: '103.54',
                available: false
            },
        ],
        stationDetails: {
            stationName: 'Victory fuels',
            licenceNumber: 'SZC654378',
            address: '121 D Street'
        },
        online: true,
        location: {
            latitude: 9.267922,
            longitude: 76.798122,
        },
    },
    {
        name: 'Brad Jacob',
        email: 'jacobbrad@test.com',
        password: bcrypt.hashSync('10293049', 10),
        phoneNumber: '9112324450',
        fuelTypes: [
            {
                name: 'Petrol',
                unitPrice: '108.67',
                available: false
            },
            {
                name: 'Diesel',
                unitPrice: '103.54',
                available: true
            },
            {
                name: 'CNG',
                unitPrice: '99.75',
                available: true
            },
        ],
        stationDetails: {
            stationName: 'Jacobs fuels',
            licenceNumber: 'ADC102983844',
            address: '123 Street'
        },
        online: true,
        location: {
            latitude: 9.261535,
            longitude: 76.780882,
        },
    },
]

const drivers = [
    {
        name: 'Ken Woods',
        email: 'kenwoods@xyz.com',
        password: bcrypt.hashSync('10203040', 10),
        phoneNumber: '9118227335',
        licence: 'DL08 12098345672',
    },
    {
        name: 'Harry Peter',
        email: 'harrypeter@xyz.com',
        password: bcrypt.hashSync('3344550', 10),
        phoneNumber: '6078594213',
        licence: 'DL03 67891234505',
    },
    {
        name: 'Arun Kumar',
        email: 'arunkumar@xyz.com',
        password: bcrypt.hashSync('0987654', 10),
        phoneNumber: '9070123456',
        licence: 'DL04 12093458671',
    },
    {
        name: 'Jenny Frank',
        email: 'jfrank@xyz.com',
        password: bcrypt.hashSync('19293949', 10),
        phoneNumber: '8086510293',
        licence: 'DL01 2901384576',
    },
    {
        name: 'Alia Sen',
        email: 'aliasen@xyz.com',
        password: bcrypt.hashSync('1526374', 10),
        phoneNumber: '6230018239',
        licence: 'DL12 39485706121',
    },
]

export {
    users, 
    distributors,
    drivers,
}