/**
 * Created by Ben on 2/17/2016.
 */
import React, {Component} from 'react';
import keyMirror from 'fbjs/lib/keyMirror';
import {Map} from 'immutable';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import {editNode} from '../../actions/DesignerActionCreators';
import s from './StyleEditor.scss';
import RichStyleEditor from './RichStyleEditor';

let AceEditor;
if (canUseDOM) {
AceEditor  = require('react-ace');
  require('brace/mode/css');
  require('brace/theme/github');
}
const EditorModes = keyMirror({
  TEXT: null,
  RICH: null
});

class StyleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: props.node,
      stylesText: this.stylesToText(props.node.get('styles', Map())),
      editorMode: EditorModes.RICH
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      node: nextProps.node
      //stylesText: this.stylesToText(nextProps.node.get('styles'))
    });
  }

  stylesToText(styles) {
    return styles.map((val, key) => `${key}: ${val};`).join('\n');
  }

  stylesFromText(styles) {
    let jsxStyles = {};
    styles.split('\n').forEach(style => {
      let styleParts = style.split(/([^:]*): *([^;]*);?/mg);
      if (styleParts.length = 4) {
        jsxStyles[styleParts[1]] = String(styleParts[2]).replace(';', '');
      }
    });
    return jsxStyles;
  }

  handleCodeChange(e) {
    let newNode = this.state.node.set('styles', Map(this.stylesFromText(e.target.value)));
    this.setState({
      node: newNode, stylesText: e.target.value
    }, () => this.saveNode(newNode));
  }
  changeStyle(newStyle) {
    let newNode = this.state.node.set('styles', newStyle);
    this.setState({node: newNode}, () => this.saveNode(newNode));
  }

  saveNode = _.debounce(newNode => editNode(newNode), 500);

  changeEditorMode(editorMode) {
    this.setState({
      editorMode: editorMode,
      stylesText: this.stylesToText(this.props.node.get('styles', Map()))
    });
  }

  renderEmptyState() {
    return (
      <div className={s.root}>
        Select an element from the list below to proceed
      </div>
    );
  }
  renderCodeEditor() {
    let styles = this.state.node.get('styles', Map());
    return (
      <div className={s.root}>
        <div className={s.editorModeButtons}>
          <button onClick={() => this.changeEditorMode(EditorModes.TEXT)}>Text</button>
          <button onClick={() => this.changeEditorMode(EditorModes.RICH)}>Rich</button>
        </div>
        {(this.state.editorMode === EditorModes.TEXT) ?
          <textarea onChange={e => this.handleCodeChange(e)}
                    value={this.state.stylesText} /> : ''
        }
        {(this.state.editorMode === EditorModes.RICH) ?
          <RichStyleEditor node={this.state.node} changeStyle={newStyle => this.changeStyle(newStyle)} /> : ''
        }
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

export default withStyles(StyleEditor, s);
