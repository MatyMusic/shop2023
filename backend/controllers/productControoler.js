import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";



//?  description: Fetch all products
//?   route  GET /api/products
//?  access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


//?  description: Fetch single product
//?   route  GET /api/product/:id
//?  access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("משאב לא נמצא");
  }
});

export { getProductById, getProducts };
