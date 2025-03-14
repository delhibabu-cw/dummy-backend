const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String },
//     mobile: { type: Number, required: true },
//     qualification: { type: String },
//     isDeleted:{type:Boolean,default:false}
// },
//     {
//         timestamps: true,
//     });
// const User = mongoose.model('babu', userSchema);
// module.exports = User;    

module.exports = mongoose.model(
    'intern',
    new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String },
        mobile: { type: Number, required: true },
        password: {type : String , required: true},
        isDeleted:{type:Boolean,default:false}
    },
        {
            timestamps: true,
            versionKey: false
        })
)