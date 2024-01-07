const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../auth");

router.post("/create", auth.verify, (req, res) => {

	const data = {
		product: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	};

	productController.addProduct(data).then(resultFromController => res.send(resultFromController));
});

router.get("/all",(req,res)=>{

    productController.getAllProducts().then(resultFromController => res.send(
        resultFromController));
});

router.get("/active-products",(req,res)=>{

    productController.activeProducts().then(resultFromController => res.send(
        resultFromController));
});
router.get("/:productId",(req,res)=>{

    productController.getProduct(req.params).then(resultFromController => res.send(
        resultFromController));
});
router.put("/:productId/update",auth.verify,(req,res)=>{

    productController.updateProduct(req.params,req.body).then(resultFromController => res.send(
        resultFromController));
});
router.patch("/:productId/archive",auth.verify,(req,res)=>{

    productController.archiveProduct(req.params,req.body).then(resultFromController => res.send(
        resultFromController));
});
router.patch("/:productId/activate",auth.verify,(req,res)=>{

    productController.activateProduct(req.params,req.body).then(resultFromController => res.send(
        resultFromController));
});

module.exports = router;