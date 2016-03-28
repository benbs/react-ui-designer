/**
 * Created by Ben on 2/14/2016.
 */

import {Iterable, Map, List, fromJS} from 'immutable';

import Dispatcher from '../core/Dispatcher';
import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';

let treeIdCounter = 0;
let domTree = fromJS({
  "id": treeIdCounter++,
  "module": "div",
  "collapsed": false
});
let activeNode = domTree;

function getNodeSelector(node) {
  let finalSelector = new List();
  function iterate(branch, selector) {
    if (Iterable.isIterable(branch)) {
      if (branch.get('id') === node.get('id')) {
        finalSelector = selector;
        return;
      }
      branch.forEach((value, key) => {
        let branchSelector = selector.push(key);
        iterate(value, branchSelector);
      });
    }
  }
  iterate(domTree, new List());
  return finalSelector;
}

function addNodeToTree(name, parent) {
  let newNode = fromJS({
    id: treeIdCounter++, module: name, children: [], collapsed: false
  });
  let parentSelector = getNodeSelector(parent);
  parentSelector = parentSelector.push('children');
  domTree = domTree.updateIn(parentSelector, childrenList => {
      childrenList = (childrenList || new List()).push(newNode);
      return childrenList;
    }
  );
  activeNode = newNode;
}

function editNode(node) {
  let nodeSelector = getNodeSelector(node);
  domTree = domTree.setIn(nodeSelector, node);
  activeNode = node;
}

class DesignerStore extends BaseStore {
  constructor() {
    super("Designer");
  }

  getDomTree() {
    return domTree;
  }
  getActiveNode() {
    return activeNode;
  }
  getAttributes(node) {
    let attrs = Map();
    node.get('attributes', List()).forEach(attr => {
      attrs = attrs.set(attr.get('key'), attr.get('value'));
    });
    return attrs;
  }
  getNodeLabel(node) {
    let label = node.get('module');
    let attributes = this.getAttributes(node);
    let id = attributes.get('id');
    let className = attributes.get('className');
    label += id ? '#' + id : '';
    label += className ? '.' + className : '';

    return label;
  }
}

let storeInstance = new DesignerStore();

storeInstance.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.SET_DOM_TREE:
      domTree = fromJS(action.tree);
      storeInstance.emitChange();
      break;
    case ActionTypes.SELECT_NODE:
      activeNode = fromJS(action.node);
      storeInstance.emitChange();
      break;
    case ActionTypes.ADD_NODE:
      addNodeToTree(action.name, action.parent);
      storeInstance.emitChange();
      break;
    case ActionTypes.EDIT_NODE:
      editNode(action.node);
      storeInstance.emitChange();
      break;
  }
});

export default storeInstance;
