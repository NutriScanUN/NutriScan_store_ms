const Tienda = require("./Models/Tienda");
const Productos = require("./Models/Productos")

module.exports = {

/* --------------------------------------------------------------------- */
/* -----------------------|| GET REQUESTS ||---------------------------- */
/* --------------------------------------------------------------------- */

/* -----------------------|| STORE ||----------------------------------- */

  async getAllStores(req, res) {
    console.log("All store Query");

    try{
      const tiendas = await Tienda.findAll();
      res.status(200).json(tiendas);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({message: "error retreivieng store: ", error});
    }
  },

  async getStore(req, res) {
    console.log("Store by id Query");

    try{
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findByPk(id);
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({message: "error retreivieng store: ", error});
    }
  },

  async getStoreByUID(req, res) {
    console.log("Store by UID Query");

    try{
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
      res.status(500).json({message: "error retreivieng store: ", error});
    }
  },


/* -----------------------|| PRODUCTS ||-------------------------------- */

  async getAllProducts(req, res) {
    console.log("All products Query");

    try{

      const productos = await Productos.findAll();
      res.status(200).json(productos);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng products: ", error);
      res.status(500).json({message: "error retreivieng products: ", error});
    }
  },

  async getAllStoreProducts(req, res) {
    console.log("All products of one store Query");

    try{
      const { id } = req.params;

      console.log("reference: ", id);

      const productos = await Productos.findAll({
        where:{
          tienda_id: id
        }
      });
      res.status(200).json(productos);

      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store products: ", error);
      res.status(500).json({message: "error retreivieng store products: ", error});
    }
  },

  async getProduct(req, res) {
    console.log("Product by reference Query");

    try{
      const { ref } = req.params;

      console.log("reference: ", ref);

      const producto = await Productos.findOne({
        where:{
          "referencia":ref
        }
      });
      res.status(200).json(producto);
      console.log("Succesfull");
    } catch (error) {
      console.log("error retreivieng store: ", error);
      res.status(500).json({message: "error retreivieng store: ", error});
    }
    return null;
  },


/* -----------------------|| STORE AND PRODUCTS ||---------------------- */

  async getStoreAndProducts(req, res) {
    console.log("Store and products by id Query");

    try{
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findByPk(id,{
        include: {model: Productos, as: "products"}
      });
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.error("error retreivieng store: ", error);
      res.status(500).json({message: "error retreivieng store: ", error});
    }
  },

  async getStoreAndProductsByUID(req, res) {
    console.log("Store and products by id Query");

    try{
      const { id } = req.params;

      console.log("id: ", id);

      const tienda = await Tienda.findAll({
        where: { uid: id },
        include: { model: Productos, as: "products" }
      });
      res.status(200).json(tienda);

      console.log("Succesfull");
    } catch (error) {
      console.error("error retreivieng store: ", error);
      res.status(500).json({message: "error retreivieng store: ", error});
    }
  },


/* --------------------------------------------------------------------- */
/* -----------------------|| POST REQUESTS ||--------------------------- */
/* --------------------------------------------------------------------- */

/* -----------------------|| STORE ||----------------------------------- */

  async createStore(req, res) {
    console.log("Store create");

    try {
      console.log(req.body);
      const tienda = await Tienda.create(req.body);
      console.log("succesfull");
      res.json(tienda);
    } catch(error){
      console.error("error creating store: ", error);
      res.status(500).json({message: "error creating store: ", error});
    }
  },


/* -----------------------|| PRODUCTS ||-------------------------------- */

  async createProduct(req, res) {
    console.log("Product create");

    try {
      console.log(req.body);
      const product = await Productos.create(req.body);
      console.log("succesfull");
      res.json(product);
    } catch(error){
      console.error("error creating product: ", error);
      res.status(500).json({message: "error creating product: ", error});
    }
  },



/* --------------------------------------------------------------------- */
/* -----------------------|| PUT REQUESTS ||---------------------------- */
/* --------------------------------------------------------------------- */

/* -----------------------|| STORE ||----------------------------------- */

  async updateStore(req, res) {
    console.log("Store update");

    try {
      const { id } = req.params;
      console.log("id: ", id);

      console.log(req.body);

      const tienda = await Tienda.update(req.body, {
        where: {tienda_id: id},
        returning: true
      });

      console.log("succesfull");
      res.json(tienda);
    } catch(error){
      console.error("error updating store: ", error);
      res.status(500).json({message: "error creating store: ", error});
    }
  },


/* -----------------------|| PRODUCTS ||-------------------------------- */

  async updateProduct(req, res) {
    console.log("Product update");

    try {
      const {ref } = req.params;
      console.log("ref: ", ref);

      console.log(req.body);

      const producto = await Productos.update(req.body, {
        where: {referencia: ref},
        returning: true
      });

      console.log("succesfull");
      res.json(producto);
    } catch(error){
      console.error("error updating Product: ", error);
      res.status(500).json({message: "error creating Product: ", error});
    }
  },



  /* --------------------------------------------------------------------- */
  /* -----------------------|| PUT REQUESTS ||---------------------------- */
  /* --------------------------------------------------------------------- */
  
  /* -----------------------|| STORE ||----------------------------------- */
  
    async deleteStore(req, res) {
      console.log("Store update");
  
      try {
        const { id } = req.params;
        console.log("id: ", id);
  
        const affectedRows = await Tienda.destroy({
          where: {tienda_id: id}
        });
  
        console.log("succesfull");
        res.json(affectedRows);
      } catch(error){
        console.error("error updating store: ", error);
        res.status(500).json({message: "error creating store: ", error});
      }
    },
  
  
  /* -----------------------|| PRODUCTS ||-------------------------------- */
  
    async deleteProduct(req, res) {
      console.log("Product update");
  
      try {
        const {ref } = req.params;
        console.log("ref: ", ref);
  
        const affectedRows = await Productos.destroy({
          where: {referencia: ref}
        });
  
        console.log("succesfull");
        res.json(affectedRows);
      } catch(error){
        console.error("error updating Product: ", error);
        res.status(500).json({message: "error creating Product: ", error});
      }
    }
}