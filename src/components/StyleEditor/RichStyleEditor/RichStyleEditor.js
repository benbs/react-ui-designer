/**
 * Created by Ben on 2/17/2016.
 */
import React, {Component} from 'react';
import {Map} from 'immutable';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
//import _ from 'lodash';

import * as SimpleFields from '../../DesignerComponents/SimpleFields';

import s from './RichStyleEditor.scss';

class RichStyleEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let styles = this.props.node.get('styles', Map());
    let baseFieldAttrs = {styles: styles, onChange: newStyle => this.props.changeStyle(newStyle)};

    let {TextField, ColorField, ButtonField} = SimpleFields;
    return (
      <div className={s.root}>
        <div className={s.boxModel}>
          <div className={cx(s.container, s.margin)}>
            <span>margin</span>
            <TextField attribute="top" className={s.top} {...baseFieldAttrs} />
            <TextField attribute="left" className={s.left} {...baseFieldAttrs} />
            <TextField attribute="bottom" className={s.bottom} {...baseFieldAttrs} />
            <TextField attribute="right" className={s.right} {...baseFieldAttrs} />
            <div className={s.containerWrapper}><div className={cx(s.container, s.border)}>
              <span>border</span>
              <TextField attribute="margin-top" className={s.top} {...baseFieldAttrs} />
              <TextField attribute="margin-left" className={s.left} {...baseFieldAttrs} />
              <TextField attribute="margin-bottom" className={s.bottom} {...baseFieldAttrs} />
              <TextField attribute="margin-right" className={s.right} {...baseFieldAttrs} />
              <div className={s.containerWrapper}><div className={cx(s.container, s.padding)}>
                <span>padding</span>
                <TextField attribute="margin-top" className={s.top} {...baseFieldAttrs} />
                <TextField attribute="margin-left" className={s.left} {...baseFieldAttrs} />
                <TextField attribute="margin-bottom" className={s.bottom} {...baseFieldAttrs} />
                <TextField attribute="margin-right" className={s.right} {...baseFieldAttrs} />
              </div></div>
            </div></div>
          </div>
        </div>
        padding: <TextField attribute="padding" {...baseFieldAttrs} /><br/>
        color: <ColorField attribute="color" {...baseFieldAttrs} /><br/>
        background: <ColorField attribute="background-color" {...baseFieldAttrs} /><br/>
        <ButtonField attribute="display" value="none" {...baseFieldAttrs}>None</ButtonField>
        <ButtonField attribute="display" value="inline" {...baseFieldAttrs}>Inline</ButtonField>
        <ButtonField attribute="display" value="block" {...baseFieldAttrs}>Block</ButtonField>
        <ButtonField attribute="display" value="inline-block" {...baseFieldAttrs}>Inline-block</ButtonField>
      </div>
    );
  }
}

export default withStyles(RichStyleEditor, s);
