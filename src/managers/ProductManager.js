import fs from 'fs';



export default class ProductManager {
    constructor() {
        this.path = 'files/Product.json';
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }
        return [];
    }

    addProducts = async (product) => {
        const products = await this.getProducts();
        if (products.length == 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products
    }

    getProductById = async (searchById) => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const cart = JSON.parse(data)
        const product = cart.find(p => p.id === searchById)
        if (product) {
            return product
        } else {
            console.error("No Existe un producto con el ID")
            return null
        }

    }

    deleteProduct = async (_id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const Existe = products.find(products => products.id === _id);

        if (!Existe) {
            console.log("No Existe un producto con el ID");
        }
        const deleteProduct = products.filter(products => products.id !== _id);
        console.log(deleteProduct)
    }

    updateProduct = async (_id, atribute, value) => {

        const datas = await fs.promises.readFile(this.path, 'utf-8');
        const productos = JSON.parse(datas);

        const item_index = productos.findIndex(p => p.id === _id)

        if (item_index < 0) {
            console.info("No Existe un producto con el ID")
            return null
        }

        const selectedItem = productos[item_index];
        selectedItem[atribute] = value;
        productos[item_index] = selectedItem;

        const cartJson = JSON.stringify(productos)
        await fs.promises.writeFile(this.path, cartJson);
    }
}
