import ProductModel from "../models/product.js";
import NotificationModel from "../models/notification.js";
import UserModel from "../models/user.js";
import { sendNotificationEmail } from "../helpers/email.js";

class ProductController {
  createProduct = async (req, res) => {
    try {
      const {
        productName,
        productImage,
        category,
        price,
        productDescription,
        productCondition,
        programName,
        courseName,
        semester,
      } = req.body;
      const userId = req.user.id;

      if (!productName || !productImage || !category || !price) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: productName, productImage, category, price",
        });
      }

      const response = await ProductModel.create({
        productName,
        productImage,
        category,
        price,
        productDescription,
        productCondition,
        owner: userId,
        programName,
        courseName,
        semester,
      });
      // console.log(response);
      const notifications = await NotificationModel.find({ productName });
      if (notifications.length > 0) {
        notifications.forEach(async (notification) => {
          console.log("Sending notification to user: ", notification.userId);
          const user = await UserModel.findById(notification.userId);
          await sendNotificationEmail(user.email, productName);
          await NotificationModel.findByIdAndDelete(notification._id);
        });
      }

      return res.status(200).json({ response, message: "Product created" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getProducts = async (req, res) => {
    try {
      // Extracting query parameters
      const {
        category,
        courseName,
        semester,
        programName,
        sortBy,
        priceRange,
        exclude
      } = req.query;

      // Constructing filter object based on provided parameters
      const filter = {};
     
      if (courseName) filter.courseName = courseName;
      if (semester) filter.semester = semester;
      if (programName) filter.programName = programName;
      if (category) filter.category = category;
      if (exclude==='exclude') {
        filter.isSold = false;}
       
    

      // Constructing price filter based on provided priceRange
      if (priceRange) {
        switch (priceRange) {
          case "500AndBelow":
            filter.price = { $lte: 500 };
            break;
          case "501To1000":
            filter.price = { $gte: 501, $lte: 1000 };
            break;
          case "1001To5000":
            filter.price = { $gte: 1001, $lte: 5000 };
            break;
          case "5001AndAbove":
            filter.price = { $gte: 5001 };
            break;
          default:
            // Handle invalid priceRange value
            break;
        }
      }

      // Constructing sort object based on provided sort option
      let sortOption = {};
      if (sortBy === "priceLowToHigh") {
        sortOption = { price: 1 };
      } else if (sortBy === "priceHighToLow") {
        sortOption = { price: -1 };
      } else if (sortBy === "newest") {
        sortOption = { createdAt: -1 };
      }

      // Finding products based on filters, sorting, and price range
      const products = await ProductModel.find(filter).sort(sortOption);
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getProductsByUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const products = await ProductModel.find({ owner: userId });
      return res.status(200).json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // getProductById = async (req, res) => {
  //   try {
  //     const productId = req.params.id;
  //     const product = await ProductModel.findById(productId);
  //     return res.status(200).json({ product });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };

  deleteProductById = async(req,res)=>{
    try{
       const productId=req.params.id ;

       const product = await ProductModel.findByIdAndDelete(productId) ;

         return res.status(200).json({message:"product deleted"});
    }
    catch(err){
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default ProductController;
