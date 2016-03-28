/**
 * Created by Ben on 2/14/2016.
 */
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export function setDomTree(tree) {
  Dispatcher.dispatch({
    type: ActionTypes.SET_DOM_TREE,
    tree
  });
}

export function selectNode(node) {
  Dispatcher.dispatch({
    type: ActionTypes.SELECT_NODE,
    node
  });
}

export function addNode(name, parent) {
  Dispatcher.dispatch({
    type: ActionTypes.ADD_NODE,
    name,
    parent
  })
}

export function editNode(node) {
  Dispatcher.dispatch({
    type: ActionTypes.EDIT_NODE,
    node
  });
}
