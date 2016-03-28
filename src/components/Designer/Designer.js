/**
 * Created by Ben on 2/13/2016.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import DesignerStore from '../../stores/DesignerStore';

import {addNode} from '../../actions/DesignerActionCreators';

import s from './Designer.scss';

import DomTree from '../DomTree';
import StyleEditor from '../StyleEditor';
import LogicEditor from '../LogicEditor';
import Preview from '../Preview';

function getStateFromStore() {
  return {
    tree: DesignerStore.getDomTree(),
    active: DesignerStore.getActiveNode()
  };
}

class Designer extends Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStore();
  }

  componentDidMount() {
    DesignerStore.addChangeListener(this.onStoreChange.bind(this));
  }

  componentWillUnmount() {
    DesignerStore.removeChangeListener(this.onStoreChange.bind(this));
  }

  onStoreChange() {
    this.setState(getStateFromStore());
  }



  render() {
    return (
      <div className={s.root}>
        <div className={s.designPane}>
          <StyleEditor node={this.state.active} />
          <DomTree tree={this.state.tree} active={this.state.active} />
        </div>
        <div className={s.previewPane}>
          <Preview tree={this.state.tree} />
        </div>
        <div className={s.logicsPane}>
          <LogicEditor node={this.state.active} />
        </div>
      </div>
    );
  }
}

export default withStyles(Designer, s);
