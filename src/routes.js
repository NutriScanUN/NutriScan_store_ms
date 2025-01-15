const express = require("express");
const router = express.Router();

const PGcontrollers = require("./PGControllers");
const multer = require("multer");
const OFFControllers = require("./OFFControllers");

/* -----------------------|| POSTGRESS ROUTES ||--------------------------- */

router.get("/store/all", PGcontrollers.getAllStores);
router.get("/store/user/:id", PGcontrollers.getStoreByUID);
router.get("/store/user/:id/products", PGcontrollers.getStoreAndProductsByUID);
router.get("/store/:id/products", PGcontrollers.getStoreAndProducts)
router.get("/store/:id", PGcontrollers.getStore);

router.get("/product/all", PGcontrollers.getAllProducts);
router.get("/product/store/:id", PGcontrollers.getAllStoreProducts)
router.get("/product/:ref", PGcontrollers.getProduct);



router.post("/store", PGcontrollers.createStore);

router.post("/product", PGcontrollers.createProduct);



router.put("/store/:id", PGcontrollers.updateStore);

router.put("/product/:ref", PGcontrollers.updateProduct);



router.delete("/store/:id", PGcontrollers.deleteStore);

router.delete("/product/:ref", PGcontrollers.deleteProduct);



/* -----------------------|| OFF ROUTES ||-------------------------------- */

const storage = multer.memoryStorage();
const upload = multer({storage});



// router.post('/uploadOffImg', upload.single('offimg'), OFFControllers.uploadOffImg);
router.get('/off/:ref', OFFControllers.getOffProduct);



module.exports = router;