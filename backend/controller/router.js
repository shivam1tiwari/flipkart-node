const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../authentication/auth')
const cors = require('cors')
const router = express.Router();
const bcrypt = require('bcrypt');
const {findProducts, findCategory, findProductById,findOrder,findCart, userRegister, validUser,updateCart, findAddress,insertOrder, editUser, deleteAddress, editAddress, submitQuery} = require('../query-data/all-query')
router.use(cors());
router.use(express.json());

// signup
router.post('/sign-up',async(req,res)=>{
  const obj = req.body;
  try{
     const response = userRegister(obj)
     res.json(obj);
  }catch(err){
    res.status(500).json({message: 'Server error'});
  }
  
});

// sign in 

router.post('/login',async (req,res)=>{
  const data = req.body;
  console.log(data)
 try{
  const userData = await validUser(data.mobile_number);
  console.log(userData, "after-fetching")
  if(userData.rows && userData.rows.length > 0){
    const hashPass = userData.rows[0].password;
    const decodePass = await bcrypt.compare(data.password, hashPass);
    
    if(decodePass){
       const token = jwt.sign({username:data.mobile_number},"thisisvalidation",{expiresIn:'1h'});
       const {id, name, email, pincode, gender_id} = userData.rows[0]
       console.log(userData.rows[0],"anyresponse")
       res.json({"Authorization": `Bearer ${token}`,"user_id":id, name:name, email:email, pincode: pincode,gender:gender_id});
    }
    // res.json(decodePass);
  }else{
    res.status(404).json({message : "Username or password incorrect"})
  }

 }catch(err){
  res.status(500).json({ message: 'Internal Server Error' });  // Handle errors
 }
});

// all product 
router.get('/products', async (req, res) => {
  try {
    const data = await findProducts();
    if (data && data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No products found' });  // Handle empty result
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });  // Handle errors
  }
});


// find all category

router.get('/category',async (req,res)=>{
  try {
    const data = await findCategory();
    // res.json(data)
    if (data && data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No products found' });  // Handle empty result
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });  // Handle errors
  }
});

// find product by id
router.get("/product/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const data = await findProductById(id);
    console.log(data);
    if (data && data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No products found' });  // Handle empty result
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });  // Handle errors
  }
});

//  find cart data
router.get("/cart",async(req,res)=>{
  const {user_id} = req.query;
  console.log(typeof user_id,user_id,"user data");
  try {
    const data = await findCart(user_id);
    console.log(data,"uuuu")
    // res.json(data);
    if (data && data.length > 0) {
      // res.json(data);
      res.status(200).json({ data: data, message: 'Data fetched successfully' }); 
    } else {
      // res.status(200);
      res.status(200).json({ data: [], message: 'No items into the cart' }); 
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });  // Handle errors
  }
})

// Insert into Cart

router.post("/cart", async (req, res) => {
  const data = req.body;
  // const {user_id, items} = data;
  // res.json(items)
  const value = updateCart(data); 
});

// find address
router.post("/address", async (req, res) => {
  try {
    const {user_id, addressData} = req.body;
    const addresses = await findAddress(user_id, addressData);
    res.json(addresses);

  } catch (err) {
    // Handle errors properly
    console.error("Error processing request:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// find order list 

router.get("/orders",async (req,res)=>{
  try {
    const result = await findOrder();
    res.json(result); // Send orders as a JSON response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }})

router.post('/order', async (req, res) => {
  try {
    const { date, name, email, address, orderId, items, payment, total } = req.body;

    // Insert the order data into the database
    const query = `
      INSERT INTO orders (date, name, email, address, order_id, items, payment, total)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [date, name, email, JSON.stringify(address), orderId, JSON.stringify(items), payment, total];
    
    await insertOrder(query,values);

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error inserting order:', err);
    res.status(500).json({ message: 'Error placing order' });
  }
});

router.post("/edit-profile",async (req, res) => {
  const data =  req.body;
  const response = await editUser(data);
  const dta = await response
  console.log(dta,"hhh");
  res.json(dta);
  // res.json(data);
})

router.delete("/address/:id",async(req, res) => {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try{
   const response = await deleteAddress(id);
  res.json({ message: `Address with ID ${id} deleted successfully` });

  }catch(err){
    res.status(500).json({ error: "Failed to delete address" });
  }
})

router.put("/address/:id",async(req, res) => {
  const {id} = req.params
  const data = req.body;
  console.log(data);
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try{
   const response = await editAddress(id, data);
  res.json(response);

  }catch(err){
    res.status(500).json({ error: "Failed to edit address" });
  }
})

router.post("/contact", async(req, res) => {
  const value = req.body;
  try{
//   if (!(meassage.name) || !(meassage.email) || !(meassage.message)) {
//     return res.status(400).json({ error: 'Name, email, and message are required' });
// }
  const response = await submitQuery(value);
  res.status(200).json({message:"Inserted"})
}catch(err){
  return res.status(500).json({ error: 'Form not submitted' });
}
})

module.exports = router;


