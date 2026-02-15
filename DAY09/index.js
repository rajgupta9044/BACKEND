const express =require("express");
const app=express();
const {auth}=require("./middleware/authenticate")   


//DATABASE ARRAY

//CRUD :CREATE READ UPDATE DELETE

app.use(express.json());

const FoodMenu = [
  { id: 1, category: "Fast Food", food: "Cheeseburger", price: 5.99 },
  { id: 2, category: "Fast Food", food: "Veggie Burger", price: 6.49 },
  { id: 3, category: "Pizza", food: "Margherita Pizza", price: 8.99 },
  { id: 4, category: "Pizza", food: "Pepperoni Pizza", price: 9.99 },
  { id: 5, category: "Dessert", food: "Chocolate Cake", price: 4.50 },
  { id: 6, category: "Dessert", food: "Vanilla Ice Cream", price: 3.25 },
  { id: 7, category: "Beverage", food: "Coca Cola", price: 1.99 },
  { id: 8, category: "Beverage", food: "Orange Juice", price: 2.49 },
  { id: 9, category: "Healthy", food: "Grilled Chicken Salad", price: 7.99 },
  { id: 10, category: "Healthy", food: "Fruit Bowl", price: 5.75 },
  { id: 11, category: "Seafood", food: "Grilled Salmon", price: 12.99 },
  { id: 12, category: "Seafood", food: "Fried Shrimp", price: 10.50 },
  { id: 13, category: "Breakfast", food: "Pancakes", price: 4.99 },
  { id: 14, category: "Breakfast", food: "Omelette", price: 5.49 },
  { id: 15, category: "Italian", food: "Spaghetti Bolognese", price: 9.50 },
  { id: 16, category: "Italian", food: "Lasagna", price: 10.25 },
  { id: 17, category: "Indian", food: "Butter Chicken", price: 11.99 },
  { id: 18, category: "Indian", food: "Paneer Tikka", price: 9.75 },
  { id: 19, category: "Chinese", food: "Fried Rice", price: 7.25 },
  { id: 20, category: "Chinese", food: "Hakka Noodles", price: 7.75 },
  { id: 21, category: "Mexican", food: "Tacos", price: 6.99 },
  { id: 22, category: "Mexican", food: "Burrito", price: 8.49 },
  { id: 23, category: "Snack", food: "French Fries", price: 2.99 },
  { id: 24, category: "Snack", food: "Nachos", price: 3.99 },
  { id: 25, category: "Beverage", food: "Cold Coffee", price: 3.50 }
];


///USER KA JO BHI FOOD ADD HOGA VO ISME JAYEGA
const AddtoCart=[];

app.get("/food",(req,res)=>{
    res.status(200).send(FoodMenu);
})

//USE MIDDLE WARE TO AUTHENTICATE IN APP.USE INSTEAD OF WRITING SEPERATE CODE
//IN POST ,DELETE AND PATCH

app.use("/admin",auth);

app.post("/admin",(req,res)=>{
        
    //AUTHORIZATION KI ADMIN KI POWERS KYA HAI 
        FoodMenu.push(req.body);
        res.status(201).send("ITEM ADDED SUCCESSFULLY");
    
})

app.delete("/admin/:id",(req,res)=>{

//AGAR ACCESS MILEGA TBHI DELETE KAR PAYEGA 

    const id= Number(req.params.id);
    const index=FoodMenu.findIndex(item=>item.id===id);

    if(index===-1){
        res.send("ITEMS DOES NOT EXIST");
    }
    else{
        FoodMenu.splice(index,1);
        res.send("Item deleted Succcessfully");
    }
})

app.patch("/admin",(req,res)=>{  
      
//AUTHORIZATION KI ADMIN KI POWERS KYA HAI 


    const id=Number(req.body.id);
    const update=FoodMenu.find(item=>item.id===id);

    if(update){
        if(req.body.category)
        update.category=req.body.category ;

        if(req.body.food)
        update.food=req.body.food;

        res.send("Item updated succesfullly");
    }
  
})



app.listen(4000,()=>{
    console.log("Listening at port Number 4000");
})