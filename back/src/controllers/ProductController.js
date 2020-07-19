const mongoose = require('mongoose');
const Product = mongoose.model('Product');


module.exports = {
    async index(req, res) {
       const products = await Product.find();
        return res.json(products);
    },

    async store(req, res){
        const {nome} = req.body

        let toDo = await Product.findOne({ nome })

        if(!toDo){
            toDo = await Product.create(req.body);
        }
        return res.json(toDo);
    },

    async show(req, res){
        const product = await Product.findById(req.params.id)
        return res.json(product);
    },

    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.json(product)
    },

    async destroy(req, res){
        const product = await Product.findByIdAndRemove(req.params.id)
        return res.json(product)
    },
}  

