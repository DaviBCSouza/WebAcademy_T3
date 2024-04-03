import { Professor, Tecnologia } from './helpersTypes';

export function listProfs(professores: Professor[]) {
  const list = professores.map(
    (p) => `<li>${p.name} ♦ Sala: ${p.classroom}</li>`
  );
  return `<ul>${list.join('')}</ul>`;
}

export function listTechs(tecnologias: Tecnologia[]) {
  const tecnologiasNodejs = tecnologias.filter((t) => t.poweredByNodejs);
  const list = tecnologiasNodejs.map((t) => `<li>${t.name} - ${t.type}</li>`);
  return `<ul>${list.join('')}</ul>`;
}
