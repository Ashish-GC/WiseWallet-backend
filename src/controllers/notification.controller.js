import NotificationModel from "../models/notification.js";

class NotificationController {

  addNotification=async(buyerDetails,sellerDetails,productSchema )=>{
        
    try{
              
         //add notification for buyer 
          const buyerMessage = `Here are the contact details of the seller for the product you're interested in: name -> ${sellerDetails.name} , email -> ${sellerDetails.email} , phone -> ${sellerDetails.mobileNo}`;
          
          const buyer = await NotificationModel.create({
            message:buyerMessage,
            userId:buyerDetails._id,
            productName:productSchema.productName,
          });

           

         //add notification for seller
         const sellerMessage = `Someone is interested in buying your product ${productSchema.productName}. You can contact them using the following details : name -> ${buyerDetails.name} , email -> ${buyerDetails.email} , phone -> ${buyerDetails.mobileNo}`;

         const seller = await NotificationModel.create({
          message:sellerMessage,
          userId:sellerDetails._id,
          productName:productSchema.productName,
        });
    }
    catch(err){
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }

  }

  addProductNotification = async(user,productName)=>{
    try{
              
      //add notification for buyer 
       const message = `The product ${productName} is now available`;
       
      await NotificationModel.create({
         message,
         userId:user._id,
         productName,
       });
 }
 catch(err){
   console.log(err);
   res.status(500).json({ message: "Internal server error" });
 }

  }

  createProductNotification = async (req, res) => {
    try {
      const { message, productName } = req.body;
      if (!message || !productName) {
        return res.status(400).json({
          message:
            "Please provide all the required fields: message, userId, productName",
        });
      }
      const userId = req.user.id;
      const response = await NotificationModel.create({
        message,
        userId,
        productName,
      });
      return res
        .status(200)
        .json({ response, message: "Notification created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getNotifications = async (req, res) => {
    try {
      const userId = req.user.id;
      const notifications = await NotificationModel.find({ userId });
      return res.status(200).json({ notifications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default NotificationController;
