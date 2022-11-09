const Expense=require('../model1/expense');
const User=require('../model1/user');
const bcrypt=require('bcrypt');

 exports.addUser=(req,res,next)=>{
    const {expense,category,description}=req.body;
   console.log(req.body);
    Expense.create({
        expense:expense,
        category:category,
        description:description,
    }).then((result)=>{
        res.json(result);
    })
    .catch(err=>console.log(err));
}

exports.getUsers=(req,res,next)=>{
    Expense.findAll().then(products=>{
      res.json(products);
    })
    .catch(err=>{console.log(err)})
}

exports.deleteUserById=(req,res,next)=>{
    const prodId=req.params.id;
    console.log(prodId);
    Expense.destroy({where :{id:prodId}})
    .then(res.status(200).json({success:true ,message:'Expense deleted'}))
    .catch(err=>{console.log(err)})
}

exports.geteditUser=(req,res,next)=>{
    const prodId=req.params.id;
    Expense.findByPk(prodId).then((user)=>{
        res.json(user);
       res.redirect(`/admin/edit-expense`);
    }).catch(err=>console.log(err));
}

exports.posteditUser=(req,res,next)=>{
    const prodId=req.params.id;
    Expense.findByPk(prodId)
    .then((user)=>{
        user.expense=req.body.expense;
        user.category=req.body.category;
        user.description=req.body.description;
        return user.save();
    })
    .then((result)=>{
       res.json(result);
        console.log('User Edited');
    })
    .catch(err=>console.log(err));
}

exports.getSignup=(req,res,next)=>{
    User.findAll()
    .then(users=>{
        res.json(users);
    })
}


exports.postSignup=(req,res,next)=>{
    const {name,email,password}=req.body;
    const saltrounds=10;
bcrypt.hash(password,saltrounds,async(err,hash)=>{
    try{
      console.log(err);
      await User.create({name:name,email:email,password:hash});
      res.status(200).json({success:true ,message:'Successfully Added'});
    }catch(err){res.status(500).json({success:false ,message:'Error Occured'})}
})    
}

exports.postLogin=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findAll({where: {email:email}})
        if(user.length>0)
        {
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err)
               throw new Error(`Something Went Wrong`);
                if(result===true)
                {
                res.status(200).json({success:true ,message:'User login sucessful'})
                }
                else{
                    res.status(401).json({success:false,message:'User not Authorized'})
                }
               })            
        }
         else{
            res.status(400).json({success:false ,message:'User not Found'})
         }     
    }
catch(err){res.status(500).json({success:false ,message:`${err}`})};
}


