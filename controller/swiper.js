var express = require('express')
var router = express.Router()
const auth = require('./auth')
var SwiperModule = require('../model/swiper')


router.post('/',auth,async(req,res,next)=>{
    try {
        const {
            title,
            img,
            newsId,
            status,
            sort    
        }=req.body
        const data = await SwiperModule.create({
            title,
            img,
            newsId,
            status,
            sort   
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
        let count = await SwiperModule.count()
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await SwiperModule.find()
        .skip((page-1)*page_size)
        .limit(page_size)
        .sort({sort:-1})
        .populate({
            path:'newsId',
        })
        res.json({
            code:200,
            data,
            count,
            msg:'获取成功'
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:id',async(req,res,next)=>{
    try {
        const {id} = req.params
        const data = await SwiperModule.findById({_id:id})
        .populate({
            path:'newsId',
        })
        res.json({
            code:200,
            data,
            msg:'获取成功'
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:id',auth,async(req,res,next)=>{
    try {
        const {id} = req.params
        const {
            title,
            img,
            newsId,
            status,
            sort   
        } =req.body
        const data = await SwiperModule.findById(id)
        const UpData = await data.updateOne({
            $set:{
                title,
                img,
                newsId,
                status,
                sort 
            } 
        })
        res.json({
            code:200,
            UpData,
            msg:'修改成功'
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',auth,async(req,res,next)=>{
    try {
        const {id} = req.params
        const data = await SwiperModule.deleteOne({_id:id})
        res.json({
            code:200,
            data,
            msg:'删除成功'
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router