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

router.get('/',async(req,res,next)=>{
    try {
        const data = await adminUserModel.find()
        .select('-password')
        res.json({
            code:200,
            data,
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

module.exports = router