const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  })
  .then(result=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode)
  {
    return res.redirect('/')
  }
  const prodId=req.params.productId;
  req.user.getProducts({where :{id:prodId}})
  //Product.findByPk(prodId)
  .then((products)=>{
    const product=products[0];
      if(!product)
      {
        return res.redirect('/');
      }
      res.render('admin/edit-product',{
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
       editing:editMode,
       product:product
      });
    })
};

exports.postEditProduct=(req,res,next)=>{
  
   const prodId=req.body.productId;
  const updatedtitle=req.body.title;
  const updatedprice=req.body.price;
  const updatedimageUrl=req.body.imageUrl;
  const updatedDesc=req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    product.title=updatedtitle;
    product.price=updatedprice;
    product.description=updatedDesc;
    product.imageUrl=updatedimageUrl;
    return product.save();
  }).then(result=>{
    console.log('UPDATED PRODUCT');
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
     

}


exports.getDeleteProduct=(req,res,next)=>{
   const prodId=req.params.productId;
         Product.destroy({where: {id:prodId}}).then(()=>{
          res.redirect('/admin/products');
         }).catch(err=>console.log(err));       
}


exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>console.log(err));
};
