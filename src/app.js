import express from 'express';
import fs from 'fs';

import ProductManager from "./managers/ProductManager.js";

const productManager = new ProductManager();
const app = express();

app.use(express.json());


app.listen(8080);
console.log('Listening ON PORT 8080');

app.get('/products', async (req, res) => {
    //Limit recibido
    let { limit } = req.query
    // Productos
    const products = await productManager.getProducts();

    // parseo de limit
    if (isNaN(Number(limit))) return res.status(200).send({
        products
    })

    limit = Number(limit)

    if (products.length >= limit) {
        const limitProduct = products.slice(0, limit)
        return res.status(200).send({ limitProduct });
    }
    //Validamos que si el limite es mayor al que tenemos en nuestro JSON, nos indique que e
    if (products.length < limit) {
        return res.status(400).send({ status: 'Error', message: 'Limite de busqueda excedido' });
    }
})

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params
    const item = await productManager.getProductById(Number(pid));
    res.send(item)
})

