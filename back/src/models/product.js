const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    tarefa: {
        type: String,
        required: true
    },
    meta: {
        type: String,
        required: true
    },
    cratedAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Product", ProductSchema);