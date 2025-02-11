
import express from "express"
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import PGcontrollers from "./Controllers/PGControllers.js";
import OFFControllers from "./Controllers/OFFControllers.js";

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





router.get('/off/:ref/fulldata', OFFControllers.getOffProductFullData);
router.get('/off/:ref', OFFControllers.getOffProduct);

router.post('/off/image', upload.single("offimg"), OFFControllers.uploadOffImage);
router.post("/off", OFFControllers.createOffProduct)

export default router;