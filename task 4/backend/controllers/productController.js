const User = require("../models/User");
const Product = require("../models/Product");
//const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");


module.exports.addProduct =(data) =>{
    console.log(data);
    if (data.isAdmin){
    
    let newProduct = new Product({
        name: data.product.name,
		description: data.product.description,
		price: data.product.price
    }) 
    return newProduct.save().then((product,error)=>{
        if (error){
            return false
        }else {
            return true
        }
    })
    }
    
    let message = Promise.resolve("User must be an Admin to access this");
    return message.then((value)=>{
        return value;
    })

}

module.exports.getAllProducts =() =>{
    return Product.find({}).then(result =>{
        return result;
    })
}


module.exports.activeProducts =() =>{
    return Product.find({isActive : true}).then(result =>{
        return result;
    })
}


module.exports.getProduct =(reqParams) =>{
    return Product.findById(reqParams.productId).then(result =>{
        return result;
    })
}


module.exports.updateProduct =(reqParams,reqBody) =>{
    let updatedProduct ={
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price
    }
    return Product.findByIdAndUpdate(reqParams.productId,updatedProduct).then((
        product, error)=>{
            if(error){
                return false;
            }else{
                return true;
            }
        })
}

module.exports.archiveProduct = (reqParams) => {

	let updateActiveField = {
		isActive: false
	};

	return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then((product, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	})
}


module.exports.activateProduct = (reqParams) => {

	let updateActiveField = {
		isActive: true
	};

	return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then((product, error) => {
		if(error){
			return false;
		} else {
			return true;
		};
	});
};


