const {pool} = require('../db-connection/db');
const bcrypt = require('bcrypt')

const findProducts =  async ()=> {
  try{
   const query = await pool.query("SELECT * FROM product");
  //  console.log(query.rows)
   return query.rows
  }catch(err){
    console.log(err)
  }
  }

  const findCategory =  async ()=> {
    try{
     const query = await pool.query("SELECT * FROM category");
    //  console.log(query.rows)
     return query.rows
    }catch(err){
      console.log(err)
    }
    }


    const findProductById =  async (param)=> {
      try{
       const query = await pool.query('SELECT * FROM product WHERE product.product_id = $1',
      [param]);
       return query.rows
      }catch(err){
        console.log(err)
      }
      }

      const findOrder =  async ()=> {
        try{
         const query = await pool.query('SELECT * FROM orders');
         return query.rows
        }catch(err){
          console.log(err)
        }
        }

        const findCart =  async (userId)=> {
          try{
           const query = await pool.query("SELECT * FROM cart WHERE user_id = $1",[userId]);
           return query.rows
          }catch(err){
            console.log(err)
          }
          }

          const userRegister =  async ({name, mobile_number, email, password, pincode, gender })=> {
          
            try {
              // Check if user already exists
              const existingUser = await pool.query('SELECT * FROM "user" WHERE mobile_number = $1', [mobile_number]);
              if (existingUser.length > 0) {
                return " User already exist"
              }
          
              // Hash password
              const hashedPassword = await bcrypt.hash(password, 10);
          
              // Insert new user into the users table
              const result = await pool.query(
                'INSERT INTO "user" (name, email, mobile_number, password, pincode, gender_id) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id',
                [name, email, mobile_number, hashedPassword,pincode, gender]
              );
              // const userId = result.rows[0].id;
              //  await pool.query(
              //   'INSERT INTO addresses (name,address, city, country, state, pincode, user_id) VALUES ($1, $2, $3, $4,$5, $6,$7)',
              //   [name, address, city, country, state, pincode, userId]
              // ); 
             }catch(err){
                throw err;
              }
         } 
         
         const validUser = async (mobile_number) => {
          try{
           const userData = await pool.query('SELECT id,name, password, email, gender_id, pincode FROM "user" WHERE mobile_number = $1 ',[mobile_number]);
           return userData;
          }catch(err){
           throw err;
          }
       }

       const updateCart = async (data) => {
        try {
          const { user_id, items } = data;
          await pool.query('DELETE FROM cart WHERE user_id = $1', [user_id]);
    
          if (items.length > 0) {
            for (let item of items) {
              const { product, quantity } = item;
              const query = `
                INSERT INTO cart (product_id, quantity, user_id) 
                VALUES ($1, $2, $3)
              `;
              // Execute the query for each item
              await pool.query(query, [product.product_id, quantity, user_id]);
            }
          }
        } catch (err) {
          console.error('Error updating cart:', err);  // Log error for debugging
          throw err;  // Re-throw the error after logging it
        }
      };
      

       const findAddress = async (user_id, addressData) => {
        try { 
          if(addressData){
          const { name, mobile, pincode, locality, address, city, state } = addressData;

          const insertResult = await pool.query(
            `INSERT INTO addresses (name, mobile, pincode, locality, address, city, state, user_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [name, mobile, pincode, locality, address, city, state, user_id]
          );}
          const addresses = await pool.query('SELECT * FROM addresses WHERE addresses.user_id = $1 ORDER BY id',[user_id]);
          return addresses.rows;
         
          } catch (err) {
          throw err;
        }
       }

      const insertOrder = (query, values) => {
       return pool.query(query, values);
      }

      const editUser = async(user) => {
        console.log(user, "user")
       try{
        const query = `
        UPDATE "user"
        SET name = $1, email = $2, pincode = $3, gender_id = $4 
        WHERE id = $5`;
        const gender_id = user.gender == "male" ? 1 : 2;
        const update =  await pool.query(query,[user.username, user.email, user.pincode,gender_id, user.id])
        const updatedUser = await pool.query('SELECT id, name, email, gender_id, pincode FROM "user" WHERE id = $1 ',[user.id])
        console.log(updatedUser.rows,"row")
        return updatedUser.rows[0];
       }catch(err){
        throw err
       }
      }

      const deleteAddress = async (id) => {
        try{
          const query = 'DELETE FROM addresses WHERE id = $1';
          const del = await pool.query(query, [id]);
          return del;
          
        }catch(err){
          throw err
        }
      }

      const editAddress = async (id, newAddress) => {
        console.log(newAddress, id)
        const {address, city, country, state, pincode, user_id, mobile, locality, name} = newAddress;
        try {
          const query = 'UPDATE addresses SET address = $1, city = $2, state = $3, country = $4, pincode = $5, user_id = $6, mobile = $7, locality = $8, name = $9 WHERE id = $10';
          const result = await pool.query(query, [address, city, state, country, pincode, user_id, mobile, locality, name, id]);
          if (result.rowCount === 0) {
            throw new Error('Address not found');
          }
          return result;
        } catch (err) {
          throw err;
        }
      };

      const submitQuery = async (data) => {
        const { name, email, user_id, message } = data;

    try {
        const result = await pool.query(
            'INSERT INTO contact (name, email, user_id, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, user_id, message]
        );
  
    } catch (err) {
        console.error('Error inserting data:', err);
    }
};
  
      

    module.exports = {findProducts, findCategory, findProductById, findOrder,findCart, userRegister, validUser,updateCart,findAddress,insertOrder, editUser, deleteAddress, editAddress, submitQuery}