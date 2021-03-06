// generic dropdown element
import React, { cloneElement, Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import uniqueId from 'lodash.uniqueid';
import TetherComponent from 'react-tether'

import DropdownTrigger from './DropdownTrigger';
import DropdownContent from './DropdownContent';

import { omit } from './helpers'

// I used class instead of react-stamp so that this could be made into a standalone module
class Dropdown extends Component {

  constructor() {
    super();
    // unique id used for closing when another dropdown gets clicked
    this.uid = uniqueId('react_super_dropdown_');
    this.displayName = 'SuperDropdown';
    this.state = { active: false };
    this._handleWindowClick = this.handleWindowClick.bind(this);
    this._handleDropdownTriggerClick = this.handleDropdownTriggerClick.bind(this);
  }

  componentDidMount() {
    // bind event listeners
    window.addEventListener('click', this._handleWindowClick);
    window.addEventListener('super_dropdown_trigger_click', this._handleDropdownTriggerClick);
  }

  componentWillUnmount() {
    // clean up events listeners
    window.removeEventListener('click', this._handleWindowClick);
    window.removeEventListener('super_dropdown_trigger_click', this._handleDropdownTriggerClick);
  }

  render() {
    // is dropdown open
    const { className, openClassName, tether } = this.props;
    const isActive = this.isActive();
    const alignment = this.getAlignment();

    let trigger = null;
    let content = null;

    React.Children.forEach(this.props.children, child => {
      // bind toggle handler to trigger child
      if (child.type === DropdownTrigger) {
        trigger = cloneElement(child, {
          ref: 'trigger',
          onClick: this.handleToggleClick.bind(this),
        });
      }
      // else render menu if is open
      else if (child.type === DropdownContent && isActive) {
        content = child;
      }
    });

    // custom tagName can be used. default is div
    return tether ? (
      <this.props.tagName
        {...omit(this.props, [
          'openClassName',
          'tagName',
          'children',
          'active',
          'alignment',
          'tether',
        ])}
        className={`${className} ${isActive ? openClassName : ''}`}
      >
        <TetherComponent
          attachment={alignment.menu}
          targetAttachment={alignment.trigger}
          constraints={[{
            to: 'scrollParent',
            attachment: 'together'
          }]}
        >
          {trigger}
          {content}
        </TetherComponent>
      </this.props.tagName>
    ) : (
      <this.props.tagName
        {...omit(this.props, [
          'openClassName',
          'tagName',
          'children',
          'active',
          'alignment',
          'tether',
        ])}
        className={`${className} ${isActive ? openClassName : ''}`}
      >
        {trigger}
        {content}
      </this.props.tagName>
    );
  }

  // check if dropdown is currently open
  isActive() {
    return (typeof this.props.active === 'boolean') ? this.props.active : this.state.active;
  }

  // close dropdown and call `props.onHide` function
  hide() {
    this.setState({ active: false });
    if (this.props.onHide) this.props.onHide();
  }

  // open dropdown and call `props.onShow` function
  show() {
    this.setState({ active: true });
    if (this.props.onShow) this.props.onShow();
  }

  getAlignment() {
    const alignmentStr = this.props.alignment;
    let [vertical, horizontal] = alignmentStr.split(' ');
    horizontal = horizontal || 'left';

    return {
      menu: `${vertical} ${horizontal}`,
      trigger: `${vertical === 'bottom' ? 'top' : 'bottom'} ${horizontal}`,
    };
  }

  // if click anywhere in window check if we clicked inside the current dropdown
  // and if not then close it
  handleWindowClick(event) {
    const dropdownElement = findDOMNode(this);
    if (
      event.target !== dropdownElement &&
      !dropdownElement.contains(event.target) &&
      this.isActive()
    ) {
      this.hide();
    }
  }

  // when click the Trigger element - toggle the dropdown and close any other dropdowns.
  // stop propagation as well so that it only toggles the dropdown and doesnt bubble up and
  // cause any other unwanted effects on parent elements
  handleToggleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeOtherDropdowns(this.uid);
    if (this.isActive()) this.hide();
    else this.show();
  }

  // handler for when a trigger is clicked on any dropdown
  // if its not this dropdown's trigger then close it
  handleDropdownTriggerClick(event) {
    if (typeof event.detail !== 'undefined' && event.detail !== this.uid) this.hide();
  }

  // dispatch global event to notify all dropdowns on page that one's trigger was clicked
  closeOtherDropdowns() {
    const event = new CustomEvent('super_dropdown_trigger_click', { detail: this.uid });
    window.dispatchEvent(event);
  }

}

Dropdown.propTypes = {
  openClassName: PropTypes.string,
  tagName: PropTypes.string,
  alignment: PropTypes.string,
  tether: PropTypes.bool,
};

Dropdown.defaultProps = {
  openClassName: 'open',
  tagName: 'div',
  alignment: 'bottom left',
  tether: true,
};

export { DropdownTrigger, DropdownContent };
export default Dropdown;
