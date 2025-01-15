const fetch = require("node-fetch");
const FormData = require("form-data");
const Productos = require("./Models/Productos");

module.exports = {


  async uploadOffImg(req, res){
    try {
      const { code, imagefield } = req.body;
      const file = req.file;
  
      console.log("uploadOffImage", {code, imagefield, file});
  
      if(file){
  
        const formdata = new FormData();
        formdata.append("user_id", "jurodriguezch");
        formdata.append("password", "OpenFoodFactsNutriScan");
        formdata.append("code", code);
        formdata.append("imagefield", imagefield);
        formdata.append(`imgupload_${imagefield}`, file.buffer, {
          filename: file.filename,
          filepath: file.path,
          contentType: file.mimetype,
          knownLength: file.size
        });
  
        const requestOptions = {
          method: "POST",
          body: formdata
        };
  
      // @ts-expect-error
        const response = await fetch("https://world.openfoodfacts.net/cgi/product_image_upload.pl", requestOptions);
        const result = await response.json();
  
        console.log("success");
        res.status(200).json(result);
      }else{
        throw new Error("field offimg return undefined")
      }
  
    } catch(error){
      console.error("error on uploadOffImg: ", error);
      if (error instanceof Error) {
        res.status(500).json({"message":error.message});
      }else{
        res.status(500).json(error);
      }
    }
  },

  async getOffProduct(req, res){
    const OFF_MS = process.env.OFF_MS ?? "http://localhost:3002/api/"

    try{
      const { ref } = req.params;
  
      const DBProdPromise = Productos.findOne({
        where:{
          "referencia":ref
        }
      });
      
      const OffRes = await fetch(`${OFF_MS}${ref}`);
      const OffProduct = await OffRes.json();
  
      const DBProduct = await DBProdPromise;
  
      if(!DBProduct){
        await Productos.create({
          referencia: ref,
          nombre: OffProduct.product.nombre,
          foto: OffProduct.product.foto
        });
      }
      
      res.send(OffProduct);
      console.log(OffProduct);
    }catch(error){
    }
  }

};