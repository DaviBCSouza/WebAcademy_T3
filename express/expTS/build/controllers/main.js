"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("lorem-ipsum");
const index = (req, res) => {
    res.send('Hello, World!');
};
const lorem = (req, res) => {
    const { paragraphs } = req.params;
    const loremText = (0, lorem_ipsum_1.loremIpsum)({
        count: parseInt(paragraphs),
        units: 'paragraphs',
        format: 'html'
    });
    res.send(loremText);
};
const hb1 = (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Hello World with the Handlebars!'
    });
};
const hb2 = (req, res) => {
    res.render('main/hb2', {
        poweredByExpress: true,
        name: 'Express',
        type: 'Framework'
    });
};
const hb3 = (req, res) => {
    res.render('main/hb3', {
        setor: 'Professores do ICOMP',
        professores: [
            { nome: 'David Fernandes', sala: 1238 },
            { nome: 'Horácio Fernandes', sala: 1233 },
            { nome: 'Edleno Moura', sala: 1236 },
            { nome: 'Elaine Harada', sala: 1231 }
        ]
    });
};
const hb3_1 = (req, res) => {
    const professores = [
        { name: 'David Fernandes', classroom: 1238 },
        { name: 'Horácio Fernandes', classroom: 1233 },
        { name: 'Edleno Moura', classroom: 1236 },
        { name: 'Elaine Harada', classroom: 1231 }
    ];
    res.render('main/hb3-1', {
        setor: 'Professores do ICOMP',
        professores
    });
};
const hb4 = (req, res) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true }
    ];
    res.render('main/hb4', {
        title: 'Tecnologias baseadas no NodeJS:',
        technologies
    });
};
const erro = (req, res) => {
    res.status(404).send('Error 404: Nada encontrado!');
};
exports.default = { index, lorem, hb1, hb2, hb3, hb3_1, hb4, erro };
