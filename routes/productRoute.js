const { Router } = require("express");
const productModel = require("../models/productModel");
const auth = require("../middlewares/auth");
const productRouter = Router();

productRouter.get("/", auth, async (req, res) => {
  const { userId } = req.body;
  let filter = { userId };
  let { old, new: newData } = req.query;
  if (old) {

    filter = {
      createdAt: { $lt: new Date(Date.now() - 10 * 60 * 100) },
      userId
    };
  } else if (newData) {
    filter = { createdAt:{ $gte: new Date(Date.now() - 10 * 60 * 1000)},
     userId
     }
  }

  try {
    const productData = await productModel.find(filter);

    res.status(200).json({ message: "All Products Found", productData });
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
});

productRouter.post("/createProduct", auth, async (req, res) => {
  const { userId, username, name, price } = req.body;
  try {
    const newProduct = await productModel.create({
      userId,
      username,
      name,
      price,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const updateProduct = await productModel.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ message: "Product updated successfully", updateProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await productModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Product updated successfully", deleteProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = productRouter;
