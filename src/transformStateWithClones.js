'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  actions.forEach((action) => {
    let nextState = { ...currentState };

    if (action.type === 'addProperties') {
      nextState = { ...nextState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete nextState[key];
      });
    }

    if (action.type === 'clear') {
      nextState = {};
    }

    stateHistory.push(nextState);

    currentState = nextState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
