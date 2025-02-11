import Tienda from "../Models/Tiendas.js";
import Productos, { CreateProductObjectFromAny, ProductoObject, ProductoRequest } from "../Models/Productos.js";
import { Request, Response } from "express";
import Ofertados, { OfertadosObject } from "../Models/Ofertados.js";
import { Op } from "sequelize";

export default {

  /* --------------------------------------------------------------------- */
  /* -----------------------|| GET REQUESTS ||---------------------------- */
  /* --------------------------------------------------------------------- */

  /* -----------------------|| STORE ||----------------------------------- */

  async getAllStores(req: Request, res: Response) {
    console.log("All store Query");

    try {
      const tiendas = await Tienda.findAll();
      res.status(200).json(tiendas);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({ message: "error retreivieng store" });
    }
  },

  async getStore(req: Request, res: Response) {
    console.log("Store by id Query");

    try {
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findByPk(id);
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({ message: "error retreivieng store" });
    }
  },

  async getStoreByUID(req: Request, res: Response) {
    console.log("Store by UID Query");

    try {
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findAll({
        where: {
          uid: id
        }
      });
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({ message: "error retreivieng store" });
    }
  },


  /* -----------------------|| PRODUCTS ||-------------------------------- */

  async getAllProducts(req: Request, res: Response) {
    console.log("All products Query");

    try {

      const productos = await Productos.findAll();
      res.status(200).json(productos);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng products: ", error);
      res.status(500).json({ message: "error retreivieng products" });
    }
  },

  async getAllStoreProducts(req: Request, res: Response) {
    console.log("All products of one store Query");

    try {
      const { id } = req.params;

      console.log("store id: ", id);

      const productos = await Ofertados.findOne({
        where: { id_tienda: id },
        include: {
          model: Productos
        }
      });
      res.status(200).json(productos);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store products: ", error);
      res.status(500).json({ message: "error retreivieng store products" });
    }
  },

  async getAllStoreProductsByUID(req: Request, res: Response) {
    console.log("All products of one store by uid Query");

    try {
      const { id } = req.params;

      console.log("store user uid: ", id);

      const productos = await Ofertados.findOne({
        where: { uid: id },
        include: {
          model: Productos
        }
      });
      res.status(200).json(productos);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store products: ", error);
      res.status(500).json({ message: "error retreivieng store products" });
    }
  },

  async getProductsSearchByName(req: Request, res: Response) {
    console.log("search products by name Query");

    try{
      const { name } = req.params;

      console.log("search product by name: ", name);

      const productos = await Productos.findAll({
        where:{
          "nombre":{
            [Op.iLike]: `%${name}%`
          }
        }
      });
      res.status(200).json(productos);

      console.log("succesfull");
    } catch (error) {
      console.log("error retreivieng store products: ", error);
      res.status(500).json({ message: "error retreivieng store products" });
    }
  },

  async getProduct(req: Request, res: Response) {
    console.log("Product by reference Query");

    try {
      const { ref } = req.params;

      console.log("reference: ", ref);

      const producto = await Productos.findOne({
        where: {
          "referencia": ref
        }
      });
      res.status(200).json(producto);
      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({ message: "error retreivieng store" });
    }
  },


  /* -----------------------|| STORE AND PRODUCTS ||---------------------- */

  async getStoreAndProducts(req: Request, res: Response) {
    console.log("Store and products by id Query");

    try {
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findByPk(id, {
        include: {
          model: Productos,
          through: {
            attributes: []
          }
        }
      });
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.error("error retreivieng store: ", error);
      res.status(500).json({ message: "error retreivieng store" });
    }
  },

  async getStoreAndProductsByUID(req: Request, res: Response) {
    console.log("Store and products by id Query");

    try {
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findAll({
        where: { uid: id },
        include: {
          model: Productos,
          through: {
            attributes: []
          }
        }
      });
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.error("error retreivieng store: ", error);
      res.status(500).json({ message: "error retreivieng store" });
    }
  },


  /* --------------------------------------------------------------------- */
  /* -----------------------|| POST REQUESTS ||--------------------------- */
  /* --------------------------------------------------------------------- */

  /* -----------------------|| STORE ||----------------------------------- */

  async createStore(req: Request, res: Response) {
    console.log("Store create");

    try {
      console.log(req.body);
      const tienda = await Tienda.create(req.body);
      console.log("succesfull");
      res.json(tienda);
    } catch (error) {
      console.error("error creating store: ", error);
      res.status(500).json({ message: "error creating store" });
    }
  },


  /* -----------------------|| PRODUCTS ||-------------------------------- */

  async createProduct(req: Request, res: Response) {
    console.log("Product create");

    try {
      console.log(req.body);
      const productRequest = req.body as ProductoRequest;

      const productObject = CreateProductObjectFromAny(productRequest);
      const product = await Productos.create(productObject) as unknown as ProductoObject;

      if (productRequest.id_tienda) {
        const oferta: OfertadosObject = {
          id_tienda: productRequest.id_tienda,
          id_producto: product.id_producto
        };

        await Ofertados.create(oferta)
      }

      console.log("succesfull");
      res.json({ ...product, id_tienda: productRequest.id_tienda });
    } catch (error) {
      console.error("error creating product: ", error);
      res.status(500).json({ message: "error creating product" });
    }
  },



  /* --------------------------------------------------------------------- */
  /* -----------------------|| PUT REQUESTS ||---------------------------- */
  /* --------------------------------------------------------------------- */

  /* -----------------------|| STORE ||----------------------------------- */

  async updateStore(req: Request, res: Response) {
    console.log("Store update");

    try {
      const { id } = req.params;
      console.log("id: ", id);

      console.log(req.body);

      const tienda = await Tienda.update(req.body, {
        where: { tienda_id: id },
        returning: true
      });

      console.log("succesfull");
      res.json(tienda);
    } catch (error) {
      console.error("error updating store: ", error);
      res.status(500).json({ message: "error creating store" });
    }
  },


  /* -----------------------|| PRODUCTS ||-------------------------------- */

  async updateProduct(req: Request, res: Response) {
    console.log("Product update");

    try {
      const { ref } = req.params;
      console.log("ref: ", ref);

      console.log(req.body);

      const producto = await Productos.update(req.body, {
        where: { referencia: ref },
        returning: true
      });

      console.log("succesfull");
      res.json(producto);
    } catch (error) {
      console.error("error updating Product: ", error);
      res.status(500).json({ message: "error creating Product" });
    }
  },



  /* --------------------------------------------------------------------- */
  /* -----------------------|| PUT REQUESTS ||---------------------------- */
  /* --------------------------------------------------------------------- */

  /* -----------------------|| STORE ||----------------------------------- */

  async deleteStore(req: Request, res: Response) {
    console.log("Store update");

    try {
      const { id } = req.params;
      console.log("id: ", id);

      const affectedRows = await Tienda.destroy({
        where: { tienda_id: id }
      });

      console.log("succesfull");
      res.json(affectedRows);
    } catch (error) {
      console.error("error updating store: ", error);
      res.status(500).json({ message: "error creating store" });
    }
  },


  /* -----------------------|| PRODUCTS ||-------------------------------- */

  async deleteProduct(req: Request, res: Response) {
    console.log("Product update");

    try {
      const { ref } = req.params;
      console.log("ref: ", ref);

      const affectedRows = await Productos.destroy({
        where: { referencia: ref }
      });

      console.log("succesfull");
      res.json(affectedRows);
    } catch (error) {
      console.error("error updating Product: ", error);
      res.status(500).json({ message: "error creating Product" });
    }
  }
}