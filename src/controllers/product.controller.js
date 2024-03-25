import ProductModel from "../models/product.js";

class ProductController{
      createProduct= async(req,res)=>{
           try{   
           const {name,studentId,productName,productImage,category,price} = req.body;
           const userId = req.user.id;

        if(!name || !studentId || !productName || !productImage || !category || !price)
              {
                return res.status(400).json({
                    message:
                      "Please provide all the required fields",
                  });
              }

         const response = await ProductModel.create({
             name,
             studentId,
             productName,
             productImage,
             category,
             price,
             userId
         });

         return res.status(200).json({ response, message: "Product created" });
        }
        catch(err){
            console.log(err);
             res.status(500).json({ message: "Internal server error" });
        }

      }

      getProducts=async(req,res)=>{
              try{
                const products = await ProductModel.find();
                return res.status(200).json({ products });
              }  
              catch(err){
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
              } 
        
      }
}
export default ProductController;