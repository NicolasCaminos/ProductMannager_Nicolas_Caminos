import { Router } from 'express'
import { managerCart } from '../productManager/managerSandbox.js'

const routerCart = Router();

routerCart.post('/', async (req, res) => {
    const newCart = { products: [] }
    const createdCart = await managerCart.createCart(newCart)
    console.log(createdCart)
    res.send(createdCart);
})

routerCart.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const mycart = await managerCart.getProductByCartId(Number(cid))
    if (!mycart) return res.send("Cart id not found");
    return res.send(mycart)
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    if (!pid || !cid) return res.send("Id not provided");

    const updateProduct = await managerCart.addProductToCart(Number(cid), Number(pid));
    return res.send(updateProduct)
})

export default routerCart;