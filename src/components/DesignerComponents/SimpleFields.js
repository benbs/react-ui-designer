/**
 * Created by Ben on 3/18/2016.
 */
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

import s from '../StyleEditor/RichStyleEditor/RichStyleEditor.scss';

function updateStyles(styles, key, value) {
  if (value) {
    return styles.set(key, value);
  } else {
    return styles.delete(key);
  }
}

export function TextField(props) {
  let styles = props.styles;
  let attribute = props.attribute;
  return (
    <input className={props.className} type="text" value={styles.get(attribute)} {...props.componentStyle}
      onChange={e => props.onChange(updateStyles(styles, attribute, e.target.value))}/>
  );
}

export function OptionField(props) {
  let styles = props.styles;
  let attribute = props.attribute;
  let options = {'': '', ...props.options};
  return (
    <select {...props.componentStyle} value={styles.get(attribute)}
      onChange={e => props.onChange(updateStyles(styles, attribute, e.target.value))}>
      {_.map(options, (value, key) => <option value={value}>{key}</option>)}
    </select>
  );
}

export function ColorField(props) {
  let styles = props.styles;
  let attribute = props.attribute;
  return (
    <input
      type="color" value={styles.get(attribute)}
      {...props.componentStyle}
      onChange={e => props.onChange(updateStyles(styles, attribute, e.target.value))}/>
  );
}

export function ButtonField(props) {
  let styles = props.styles;
  let attribute = props.attribute;
  return (
    <a className={cx(s.btn, {[s.selected]: styles.get(attribute) === props.value})}
       href="#" {...props.componentStyle}
       onClick={e => props.onChange(styles.set(attribute, props.value))}>

      {props.children}
    </a>
  );
}
