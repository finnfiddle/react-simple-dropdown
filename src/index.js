import ReactDOM from 'react-dom';
import React from 'react';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-super-dropdown';

ReactDOM.render((
  <Dropdown
    onShow={() => alert('dropdown shown')}
    onHide={() => alert('dropdown hidden')}
  >
    <DropdownTrigger tagName='a'>Profile</DropdownTrigger>
    <DropdownContent tagName='ul'>
      <li>
        <a href="">Profile</a>
      </li>
      <li>
        <a href="">Favorites</a>
      </li>
      <li>
        <a href="">Log Out</a>
      </li>
    </DropdownContent>
  </Dropdown>
), document.getElementById('example-1'));

class ControlledDropdown extends React.Component {

  constructor() {
    super();
    this.state = { active: false };
  }

  render() {
    const { active } = this.state;

    return (
      <div>
        <a onClick={() => { this.setState({ active: !active }); }>
          Toggle
        </a>
        <Dropdown active={active}>
          <DropdownTrigger tagName='a'>Menu</DropdownTrigger>
          <DropdownContent tagName='ul'>
            <li>
              <a href="">Profile</a>
            </li>
            <li>
              <a href="">Favorites</a>
            </li>
            <li>
              <a href="">Log Out</a>
            </li>
          </DropdownContent>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render((
  <ControlledDropdown />
), document.getElementById('example-2'));
