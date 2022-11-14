const express=require('express')
const helmet=require('helmet');
const morgan=require('morgan');
const path=require('path');
const fs=require('fs');

const bodyParser=require('body-parser');

const sequelize=require('./util/database')

const app=express();

app.use(bodyParser.json({ extended: false }));

const cors=require('cors');
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'}); 

app.use(cors());
app.use(helmet());
app.use(morgan('combined',{stream:accessLogStream}));

const dotenv = require('dotenv');
dotenv.config();

const Expense=require('./model1/expense');
const User=require('./model1/user');
const Order=require('./model1/order');
const Forgotpassword=require('./model1/forgotpassword');
const DownloadedFiles=require('./model1/filedownloaded');

Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadedFiles);
DownloadedFiles.belongsTo(User);


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