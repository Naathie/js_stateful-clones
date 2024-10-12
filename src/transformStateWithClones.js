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
    let currentStateCopy;

    switch (action.type) {
      case 'addProperties':
        currentStateCopy = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentStateCopy = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentStateCopy[key];
        });
        break;

      case 'clear':
        currentStateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = currentStateCopy;

    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
