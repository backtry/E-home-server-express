const mongoose = require('mongoose')

const Swiper = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:String,
    newsId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'news'
    },
    status:{
        type:Number,
        default:1
    },
    sort:{
        type:Number,
        default:0
    }
}, {versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('Swiper',Swiper )
