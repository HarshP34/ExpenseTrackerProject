const express=require('express')

const bodyParser=require('body-parser');

const sequelize=require('./util/database')

const app=express();

app.use(bodyParser.json({ extended: false }));

const cors=require('cors');

app.use(cors());


const Expense=require('./model1/expense');
const User=require('./model1/user');

User.hasMany(Expense);
Expense.belongsTo(User);
const adminRoutes=require('./routes1/admin_route');

app.use('/admin',adminRoutes);


sequelize.sync()
.then()
.catch(err=>console.log(err));






app.listen(3000);