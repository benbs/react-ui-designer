/**
 * Created by Ben on 2/13/2016.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {fromJS} from 'immutable';

import {setDomTree, selectNode, addNode} from '../../actions/DesignerActionCreators';
import DesignerStore from '../../stores/DesignerStore';

import s from './DomTree.scss';

import Tree from 'react-ui-tree';

class DomTree extends Component {

  constructor(props) {
    super(props);
  }

  onClickNode(node) {
    selectNode(node);
  }

  renderNode(node) {
    return (
      <span className={cx('node', {'is-active': this.props.active.equals(fromJS(node))})}
            onClick={this.onClickNode.bind(this, node)}>
        {DesignerStore.getNodeLabel(fromJS(node))}
      </span>
    );
  }

  handleChange(tree) {
    setDomTree(tree);
  }

  addNode(module) {
    if (!this.props.active.isEmpty()) {
      addNode(module, this.props.active);
    }
  }

  render() {
    let tree = this.props.tree.toJS();
    return (
      <div className={s.root}>
        <button className={s.addNode} onClick={() => this.addNode('div')}>Div</button>
        <button className={s.addNode} onClick={() => this.addNode('span')}>Span</button>
        <button className={s.addNode} onClick={() => this.addNode('input')}>Input</button>
        <Tree
          paddingLeft={20}
          tree={tree}
          renderNode={this.renderNode.bind(this)}
          onChange={this.handleChange.bind(this)}
          />
      </div>
    );
  }
}

export default withStyles(DomTree, s);
