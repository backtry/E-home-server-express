var express = require('express')
var router = express.Router()
const auth = require('./auth')
const newsModule = require('../model/news')


router.post('/',auth,async(req,res,next)=>{
    try {
        let {
            title,
            content,
            contentText,
            img,
            author,
            type,
            looknumber
        } = req.body
        const data = newsModule.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
            looknumber
        })
        res.json({
            code:200,
            data,
            msg:'新闻添加成功'
        })
    } catch (error) {
        next(error)
    }
})

router.get('/',async(req,res,next)=>{
try {
    let count = await newsModule.count()
    let {page = 1, page_size = 10} = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)
    const datalist = await newsModule
        .find()
        .skip((page-1)*page_size)
        .limit(page_size)
        .sort({_id: -1})
        .populate({
            path:'author',
            select:'-password'
        })
        .populate({
            path:'type'
        }) 

    res.json({
        code:200,
        data:datalist,
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
        const data = await newsModule
            .findById(id)
            .populate({
                path:'author',
                select:'-password'
            })
            .populate({
                path:'type'
            }) 
    
        res.json({
            code:200,
            data:data,
            msg:'获取成功'
            })
        } catch (error) {
            next(error)
        }
})

router.put('/:id',auth,async(req,res,next)=>{
    try {
        const {
            title,
            content,
            contentText,
            img,
            author,
            type,
            looknumber
        }=req.body
        const {id} = req.params
        const data = await newsModule.findById(id)
        const upData = await data.updateOne({
            $set:{
                title,
                content,
                contentText,
                img,
                author,
                type,
                looknumber
            }
        })
        res.json({
            code:200,
            upData,
            msg:"修改成功"
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',auth,async(req,res,next)=>{
    try {
        const {id} = req.params
        const data = await newsModule.deleteOne({_id:id})
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