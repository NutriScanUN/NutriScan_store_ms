import Productos, { ProductoObject } from "../Models/Productos.js";
import FormData from "form-data";
import { Request, Response } from "express";

import("node-fetch").then(res => {
  if(!globalThis.fetch){
    // @ts-expect-error
    globalThis.fetch = res.default;
    // @ts-expect-error
    globalThis.Headers = res.Headers;
    // @ts-expect-error
    globalThis.Request = res.Request
    // @ts-expect-error
    globalThis.Response = res.Response;
    globalThis.Blob = res.Blob;
  }
})

const OFF_MS = process.env.OFF_MS ?? "http://localhost:3002/api"

async function getOffProductInternal(req: Request, res: Response, fulldata = false){

  try{
    const { ref } = req.params;

    const DBProdPromise = Productos.findOne({
      where:{
        "referencia":ref
      }
    });
    
    const OffRes = await fetch(`${OFF_MS}/${ref}${fulldata?"/fulldata":""}`);
    const OffProduct = await OffRes.json() as any;

    const DBProduct = await DBProdPromise;

    if(!DBProduct){
      const newProduct: ProductoObject = {
        referencia: ref,
        nombre: OffProduct.producto.nombre,
        url_imagen: OffProduct.producto.foto
      } as ProductoObject;

      await Productos.create(newProduct);
    }
    
    res.json(OffProduct);
    console.log(OffProduct);
  }catch(error){
    console.error("error getting Off product: ", error);
    res.status(500).json({message: "error getting OffProduct", error})
  }
}

export default {
  async getOffProduct(req: Request, res: Response) { return getOffProductInternal(req, res)},
  async getOffProductFullData(req: Request, res: Response) { return getOffProductInternal(req, res, true)},

  async createOffProduct(req: Request, res: Response){
    console.log("Product create");

    try {
      console.log(req.body);

      const pgProduct = (({
        tienda_id,
        referencia,
        nombre,
        descripcion,
        foto
      }) => ({
        tienda_id,
        referencia,
        nombre,
        descripcion,
        foto
      }))(req.body.producto);

      await Productos.create(pgProduct);

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

  async uploadOffImage(req: Request, res: Response){
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

      const requestOptions = 
      {
        method: "POST",
        body: formdata
      };

    //  @ts-expect-error
      const fetchRes = await fetch(`${OFF_MS}/image`, requestOptions)
      const info = await fetchRes.json();

      console.log(info)
      res.json(info);
    }catch(error){
      console.error("error uploading image: ", error);
      res.status(500).send({message: "error uploading image", error});
    }
  },

  async updateOffProduct(req: Request, res: Response){

  }
};