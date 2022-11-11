const express=require('express')

const bodyParser=require('body-parser');

const sequelize=require('./util/database')

const app=express();

app.use(bodyParser.json({ extended: false }));

const cors=require('cors');

app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const Expense=require('./model1/expense');
const User=require('./model1/user');
const Order=require('./model1/order');
const Forgotpassword=require('./model1/forgotpassword');

Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

const adminRoutes=require('./routes1/admin_route');
const purchaseRoutes=require('./routes1/purchase');
const resetRoutes=require('./routes1/resetpassword');

app.use('/admin',adminRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/password',resetRoutes);

sequelize
//.sync({force:true})
.sync()
.then()
.catch(err=>console.log(err));






app.listen(3000);