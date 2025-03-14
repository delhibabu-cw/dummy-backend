const User = require('../Model/model')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        
        const checkExist = await User.findOne({ mobile: req.body.mobile })
        if(checkExist){
            return res.status(400).json({ msg : 'Already Exit' })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);  
        // return res.json({ password : req.body.password })
        // console.log(req.body.password);
        

        const data = await User.create(req.body)
        if (data) {
            return res.json({ result: data , msg : 'Data Created Successfully..!' })
        } else {
            return res.status(400).json({ msg: 'somthing went wrong' })
        }

    } catch (error) {
        return res.status(500).json({error})
    }

}

const   getUser = async (req,res) => {
    try{
        const id = req.params.id
        if(id){
            const data = await User.findOne({ _id : id , isDeleted : false})
            if(data){
               return res.json({ result : data ,  msg : 'Data Fetched Successfully...!'})
            }else{
                return res.send({ msg : 'No Data Found' })
            }
        }
        const data1 = await User.find({isDeleted : false})
        if(data1){
            res.send({ result : {
                rows :  data1,
                pagination : {
                    currPage : 0,
                    pages : 1,
                    total : 2
                } } , msg : 'Data Fecthed Successfully..!'})
        }else{
            res.send({ msg : 'No Data Found' })
       }
    }catch(error){
        return res.status(400).json({error : {
            path : error.path,
            msg : error.message9
        }})
    }
}

const updateUser =  async (req,res) => {
    try{
        const id = req.params.id

        const chectExist = await User.findOne({_id: id})
        if(!chectExist){
            return res.json({ msg : 'Data Not Found' })
        }

        const update = await User.updateOne({_id: id}, req.body)
        if(update){
            return res.json({ result : update })
        }else{
            return res.json({ msg: 'Update Failed' })
        }

    }catch(error){ 
        console.log('error----',error)        
    }
}

const deleteUser = async (req,res) => {
    try{
    const id = req.params.id

    const checkExist = await User.findOne({_id: id , isDeleted : false})
    if(!checkExist){
        return res.status(500).json({ msg : 'SomeThing Went Wrong' })
    }

    const deleted = await User.updateOne({_id: id},{isDeleted: true})
    if(deleted){
        return res.json({ result : deleted , msg : "User Deleted Successfully...!" })
    }else{
        return res.status(400).json({ msg : 'User Delete Failed' })
    }
}catch(error){
    return res.status(500).json({ msg : 'Some thing went wrong' })
}
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}