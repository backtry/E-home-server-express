const {Router} = require('express')
const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')

router.post('/',auth,async(req,res,next)=>{
    try {
        let {
            username,
            nicknama,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        }=req.body;
        const data = await adminUserModel.create({
            username,
            nicknama,
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


module.exports = router