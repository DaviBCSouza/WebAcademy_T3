"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTechs = exports.listProfs = void 0;
function listProfs(professores) {
    const list = professores.map((p) => `<li>${p.name} ♦ Sala: ${p.classroom}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
exports.listProfs = listProfs;
function listTechs(tecnologias) {
    const tecnologiasNodejs = tecnologias.filter((t) => t.poweredByNodejs);
    const list = tecnologiasNodejs.map((t) => `<li>${t.name} - ${t.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
exports.listTechs = listTechs;
