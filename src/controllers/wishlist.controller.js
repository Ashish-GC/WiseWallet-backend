import ProductModel from "../models/product.js";
import WishlistModel from "../models/wishlist.js";

class wishlistController {

  toggleWishlist = async (req, res) => {
    try {
       
         const {productId} = req.body;
         const userId = req.user.id;
         if (!productId) {
            return res.status(400).json({
              message:
                "Please provide all the required field: product",
            });
          }    

         const checkWishlist = await  WishlistModel.find({productId : productId })
        console.log(checkWishlist)
         if(checkWishlist[0]){
           await WishlistModel.findByIdAndDelete(checkWishlist[0]._id);
           return res.status(200).json({ message: "product removed from wishlist" });
         }
    
          const product = await ProductModel.findById(productId);

          if(!product){
            return res.status(404).json({ message: "Product not found" });
          }


          const response = await WishlistModel.create({
              productId:productId,
              product:product,
              customer:userId
          })

          return res.status(200).json({ response, message: "Added to wishlist" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
      
        const response = await WishlistModel.find({ customer: userId });

         return res.status(200).json({ response, message: "your wishlist" });
            
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  deleteWishlist = async (req, res) => {
    try {
        const wishlistId = req.params.id; 
        
         await WishlistModel.findByIdAndDelete(wishlistId);

        return res.status(200).json({ message: "product removed from wishlist" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


}

export default wishlistController;
