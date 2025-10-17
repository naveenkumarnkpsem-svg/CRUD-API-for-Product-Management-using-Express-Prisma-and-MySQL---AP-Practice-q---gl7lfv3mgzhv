const express = require('express');

const {authMiddleware} = require("./authMiddleware")
const {prisma}= require("./db/config")
const app = express();
app.use(express.json());

app.use(authMiddleware)

app.post("/api/products/create",async(req,res)=>{
  const {name,stock,price} = req.body

   if (!name || !stock || !price) {
    return res.status(400).json({
      error: "All fields required"
    })};

    const co = await prisma.product.create({
      data:{
        name,stock,price
      }
    })
    return res.status(201).json(co)



})

app.get("/api/products/get" , async(req,res)=>{
  const all = await prisma.product.findMany()
  return res.status(200).json(all)

})

app.get("/api/products/getById/:id" , async(req,res)=>{
  const {id} = req.params;
  const newid= parseInt(id)
  const all = await prisma.product.findUnique({
    where:{id:newid}})
  return res.status(200).json(all)

})

app.put("/api/products/put/:id" , async(req,res)=>{
  const {id} = req.params;
  const {name,stock,price} = req.body;
  const newid= parseInt(id)
  const all = await prisma.product.update({
    where:{
      id:newid
    },
    data:{
      name:name,
      stock:stock,
      price:price

    }
  })
  return res.status(200).json(all)

})
app.patch("/api/products/patch/:id" , async(req,res)=>{
  const {id} = req.params;
  const {name,stock,price} = req.body;
  const newid= parseInt(id)
  const all = await prisma.product.update({
    where:{
      id:newid
    },
    data:{

      stock:stock
      

    }
  })
  return res.status(200).json(all)

})
app.delete("/api/products/delete/:id" , async(req,res)=>{
  const {id} = req.params;
  const newid= parseInt(id)
  const all = await prisma.product.delete({
    where:{id:newid}})
  return res.status(200).json({
  "message":"Product is deleted"
})

})



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports=app;
