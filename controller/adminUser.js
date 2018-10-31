const {Router} = require('express')
const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')


router.post('/',auth,async(req,res,next)=>{
    try {
        let {
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        }=req.body;
        const data = await adminUserModel.create({
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        })
        res.json({
            code:200,
            data,
            msg:'新建管理员用户成功'
        })
    } catch (error) {
        next(error)
    }
})

router.post('/login',async(req,res,next)=>{
    try {
        const {username,password} = req.body;
        if(username&&password){
            const user = await adminUserModel.findOne({username})
            if(user){
                if(password == user.password){
                    req.session.user = user
                    res.json({
                        code:200,
                        data:user,
                        msg:'登录成功'
                    })
                }else{
                    res.json({
                        code:401,
                        msg:'密码错误'
                    })
                }
            }else{
                res.json({
                    code:401,
                    msg:'用户不存在'
                })
            }
        }else{
            res.json({
                code:400,
                msg:'缺少必要参数'
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/logout',async(req,res,next)=>{
    try {
        req.session.user = null
        res.json({
            code:200,
            msg:'退出登录'
        })
    } catch (error) {
        next(error)
    }
})

router.get('/',async(req,res,next)=>{
    try {
        let count = await adminUserModel.count()
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await adminUserModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .select('-password')
            res.json({
                code:200,
                data,
                count,
                msg:'请求成功'
            })
    } catch (error) {
        next(error)    
    }
})

router.get('/:id',async(req,res,next)=>{
    try {
        const _id = req.params
        const data = await adminUserModel.findById({_id})
        res.json({
            code:200,
            msg:'请求成功',
            data
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/',auth,async(req,res,next)=>{
    try {
        const _id = req.query.id
        const data = await adminUserModel.deleteOne({_id})
        res.json({
            code:200,
            msg:'删除成功',
            data
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:id',async(req,res,next)=>{
    try {
        const {id} = req.params 
        let {
            username,
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex
        }=req.body
        const user = await adminUserModel.findById({_id:id})
        const UpData = user.UpDataOne({
            $set:{
                username,
                nickname,
                avatar,
                desc,
                job,
                phone,
                sex
            }
        })
        res.json({
            code:200,
            data:UpData,
            msg:'修改成功'
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router