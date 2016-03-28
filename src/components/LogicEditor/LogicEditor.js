/**
 * Created by Ben on 2/17/2016.
 */
import React, {Component} from 'react';
import {List} from 'immutable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';

import {editNode} from '../../actions/DesignerActionCreators';

import s from './LogicEditor.scss';

class LogicEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {node: props.node};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      node: nextProps.node
    });
  }

  refocus(index, item) {
    let input = document.getElementsByClassName(s.row)[index].children[item];
    input.focus();
    if (input.setSelectionRange) {
      let len = input.value.length * 2;
      input.setSelectionRange(len, len);
    }
  }

  changeKey(index, e) {
    let newNode = this.state.node.setIn(['attributes', index, 'key'], e.target.value);
    let newEntry = newNode.getIn(['attributes', index]);
    if (!newEntry.get('key') && !newEntry.get('value')) {
      newNode = newNode.deleteIn(['attributes', index]);
    }
    this.setState({node: newNode}, () => this.refocus(index, 0));
    this.saveNode();
  }

  changeValue(index, e) {
    let newNode = this.state.node.setIn(['attributes', index, 'value'], e.target.value);
    let newEntry = newNode.getIn(['attributes', index]);
    if (!newEntry.get('key') && !newEntry.get('value')) {
      newNode = newNode.deleteIn(['attributes', index]);
    }
    this.setState({node: newNode}, () => this.refocus(index, 1));
    this.saveNode();
  }

  changeInnerText(e) {
    this.setState({node: this.state.node.set('innerText', e.target.value)});
    this.saveNode();
  }

  saveNode = _.debounce(function() {
    editNode(this.state.node);
  }, 1000);

  renderEmptyState() {
    return (
      <div className={s.root}>
        Select an element from the list below to proceed
      </div>
    );
  }
  renderCodeEditor() {
    let attributes = this.state.node.get('attributes', List());
    let mappedAttrs =  attributes.map((entry, index) => {
      return (
        <div className={s.row} key={index}>
          <input type="text" value={entry.get('key')}
                 onChange={e => this.changeKey(index, e)} />
          <input type="text" value={entry.get('value')}
                 onChange={e => this.changeValue(index, e)} />
        </div>
      );
    });
    return (
      <div className={s.root}>
        {mappedAttrs}
        <div className={s.row}>
          <input type="text" value="" placeholder="key"
                 onChange={e => this.changeKey(mappedAttrs.size, e)} />
          <input type="text" placeholder="value"
                 onChange={e => this.changeValue(mappedAttrs.size, e)} />
        </div>
        <div className={s.innerText}>
          <input type="text" value={this.state.node.get('innerText')} placeholder="content"
                 onChange={e => this.changeInnerText(e)} />
        </div>
      </div>
    );
  }
  render() {
    if (this.state.node.isEmpty()) {
      return this.renderEmptyState();
    }
    return this.renderCodeEditor();
  }
}

export default withStyles(LogicEditor, s);
