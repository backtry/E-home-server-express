var express = require('express')
var router = express.Router()
const categoryModule = require('../model/category')

router.post('/',async(req,res,next)=>{
    try {
        const{title,icon} = req.body
        const data = await categoryModule.create({
            title,icon
        })
        res.json({
            code:200,
            data,
            msg:'添加成功'
        })
    } catch (error) {
        next(error)
    }
})

router.get('/',async(req,res,next)=>{
    try {
        const data = await categoryModule.find()
        .sort({_id:-1})
        res.json({
            code:200,
            data,
            msg:'请求成功'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router