/**
 * connections
 */

/* Node modules */

/* Third-party modules */

/* Files */

const defaultState = [];

for (let i = 0; i < 5; i += 1) {
  defaultState.push({
    id: `id${i}`,
    name: `name${i}`,
  });
}

export default {

  namespaced: true,

  state: defaultState,

};
