const fetch = require("node-fetch");
const Productos = require("./Models/Productos");
const FormData = require("form-data");

const OFF_MS = process.env.OFF_MS ?? "http://localhost:3002/api/"

async function getOffProductInternal(req, res, fulldata = false){

  try{
    const { ref } = req.params;

    const DBProdPromise = Productos.findOne({
      where:{
        "referencia":ref
      }
    });
    
    const OffRes = await fetch(`${OFF_MS}${ref}${fulldata?"/fulldata":""}`);
    const OffProduct = await OffRes.json();

    const DBProduct = await DBProdPromise;

    if(!DBProduct){
      await Productos.create({
        referencia: ref,
        nombre: OffProduct.producto.nombre,
        foto: OffProduct.producto.foto
      });
    }
    
    res.json(OffProduct);
    console.log(OffProduct);
  }catch(error){
    console.error("error getting Off product: ", error);
    res.status(500).json({message: "error getting OffProduct", error})
  }
}

module.exports = {
  async getOffProduct(req,res) { return getOffProductInternal(req, res)},
  async getOffProductFullData(req,res) { return getOffProductInternal(req, res, true)},

  async createOffProduct(req, res){
    console.log("Product create");

    try {
      console.log(req.body);

      const pgProduct = (({
        tienda_id,
        longitud,
        referencia,
        nombre,
        descripcion,
        foto
      }) => ({
        tienda_id,
        longitud,
        referencia,
        nombre,
        descripcion,
        foto
      }))(req.body.producto);

      //await Productos.create(pgProduct);

      let offProduct = {producto: {}, infoProducto: {}}

      offProduct.producto = (({
        referencia,
        nombre,
        categorias
      }) => ({
        referencia,
        nombre,
        categorias
      }))(req.body.producto);

      offProduct.infoProducto = req.body.infoProducto;
      
      const OffRes = await fetch(`${OFF_MS}`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offProduct)
      }
      );

      const info = await OffRes.json()

      console.log("succesfull");
      res.status(OffRes.status).json(info)
    } catch(error){
      console.error("error creating product: ", error);
      res.status(500).json({message: "error creating product: ", error});
    }
  },

  async uploadOffImage(req, res){
    try{
      console.log("trying to upload");

      const { referencia } = req.body;
      const file = req.file;

      console.log(file);

      console.log({
        filename: file.originalname,
        contentType: file.mimetype,
        knownLength: file.size
      });

      const formdata = new FormData();
      formdata.append("referencia", referencia);
      formdata.append("offimg", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
        knownLength: file.size
      });

      const requestOptions = {
        method: "POST",
        body: formdata
      };

      const fetchRes = await fetch(`${OFF_MS}image`, requestOptions)
      const info = await fetchRes.json();

      console.log(info)
      res.json(info);
    }catch(error){
      console.error("error uploading image: ", error);
      res.status(500).send({message: "error uploading image", error});
    }
  }
};