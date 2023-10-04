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

// //?  description:  create a produc
// //?   route  POST /api/products
// //?  access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "בחר שם מוצר",
    price: 0,
    user: req.user._id,

    image: "/images/(1).jpg",
    brand: "בחר מותג ",
    category: "בחר שם קטגוריה",
    countInStock: 0,
    numReviews: 0,
    description: "בחר תיאור מוצר",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//?  description: Update a products
//?   route  PUT /api/products/:id
//?  access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("משאב לא נמצא");
  }
});

//?  description: delete a products
//?   route  DELETE /api/products/:id
//?  access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({
      _id: product._id,
    });
    res.status(200).json({ message: "מוצר נמחק בהצלחה" });
  } else {
    res.status(404);
    throw new Error("מוצר לא נמצא");
  }
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
