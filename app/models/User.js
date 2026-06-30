// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     address: {
//         street: String,
//         suite: String,
//         city: String,
//         zipcode: String,
//         geo: {
//             lat: String,
//             lng: String
//         }
//     },
//     phone: {
//         type: String,
//         required: true
//     },
//     website: {
//         type: String,
//         required: true
//     },
//      password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     company: {
//         name: {
//             type: String,
//             required: true
//         },
//         catchPhrase: {
//             type: String,
//             required: true
//         },
//         bs: {
//             type: String,
//             required: true
//         }
//     }
// });

// module.exports = mongoose.model('user', UserSchema);





const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});



module.exports = mongoose.model('user', UserSchema);