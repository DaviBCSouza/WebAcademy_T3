"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index = async (req, res) => {
    try {
        const response = await fetch(`${process.env.URL_DB}/produtos`);
        const produtos = await response.json();
        res.render('produto/index', { produtos });
    }
    catch (err) {
        console.log(err);
    }
};
const create = async (req, res) => {
    if (req.method === 'GET') {
        res.render('produto/create');
    }
    else if (req.method === 'POST') {
        const produto = req.body;
        try {
            await fetch(`${process.env.URL_DB}/produtos`, {
                method: 'POST',
                body: JSON.stringify(produto)
            });
            res.redirect('/produto');
        }
        catch (err) {
            console.log(err);
        }
    }
};
const read = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${process.env.URL_DB}/produtos/${id}`);
        const produto = await response.json();
        res.render('produto/view', { produto });
    }
    catch (err) {
        console.log(err);
    }
};
const update = async (req, res) => {
    const { id } = req.params;
    if (req.method === 'GET') {
        const response = await fetch(`${process.env.URL_DB}/produtos/${id}`);
        const produto = await response.json();
        res.render('produto/update', { produto });
    }
    else if (req.method === 'POST') {
        const produtoAtualizado = req.body;
        try {
            await fetch(`${process.env.URL_DB}/produtos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(produtoAtualizado)
            });
            res.redirect(`/produto/${id}`);
        }
        catch (err) {
            console.log(err);
        }
    }
};
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await fetch(`${process.env.URL_DB}/produtos/${id}`, {
            method: 'DELETE'
        });
        res.redirect('/produto');
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = { index, create, read, update, remove };
