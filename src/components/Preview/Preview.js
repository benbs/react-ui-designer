/**
 * Created by Ben on 2/13/2016.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {List, Map} from 'immutable';
import _ from 'lodash';

import s from './Preview.scss';

class Preview extends Component {

  constructor(props) {
    super(props);
  }

  convertStyles(styles) {
    let jsxStyles = Map();
    styles.forEach((val, key) => {
      jsxStyles = jsxStyles.set(_.camelCase(key), val);
    });
    return jsxStyles;
}

  convertAttributes(attributes) {
    let attrs = {};
    attributes.forEach(entry => {
      attrs[entry.get('key')] = entry.get('value');
    });
    return attrs;
  }

  renderNode(node) {
    let attrs = {};
    let module = node.get('module');
    if (node.get('styles')) {
      attrs.style = this.convertStyles(node.get('styles')).toJS();
    }
    if (node.get('attributes')) {
      Object.assign(attrs, this.convertAttributes(node.get('attributes')));
    }
    return React.createElement(module, attrs, node.get('innerText'),
        ...node.get('children', List()).map(subNode => this.renderNode(subNode)));
  }

  renderTree() {
    return this.renderNode(this.props.tree);
  }

  render() {
    let tree = this.props.tree;
    return (
      <div className={s.root}>
        {this.renderTree()}
      </div>
    );
  }
}

export default withStyles(Preview, s);
