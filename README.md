## React Super Dropdown

Non-prescriptive React.js dropdown toolkit.

## Disclaimer

This is a fork of [react-simple-dropdown](https://www.npmjs.com/package/react-simple-dropdown).

With the following enhancements:

- Updated ES2015 source syntax
- Removed need for external stylesheet to be used
- Added ability to use custom tag names for the trigger and menu elements. With `react-simple-dropdown` the trigger and menu may only be rendered using `div` tags. With this component you can use `ul`, `a`, or even any custom components you like. This is useful if you are using a ready-made theme.
- Menu is not rendered if dropdown is closed - instead of it just being hidden by css.

### Installation

This module is designed for use with [Browserify](http://browserify.org) (but should work with anything CommonJS compatible). You can easily install it with [npm](http://npmjs.com):

```bash
npm install react-super-dropdown
```

### How to use

This module provides three React components that you can use as a basis for any kind of dropdown menu:

- `DropdownTrigger`: The element that will cause your dropdown to appear when clicked.
- `DropdownContents`: Contains the "filling" of your dropdown. Generally, this is a list of links.
- `Dropdown`: The base element for your dropdown. This contains both the `DropdownTrigger` and the `DropdownContents`, and handles communication between them.

Keep in mind that `DropdownTrigger` and `DropdownContent` **must be direct children** of `Dropdown`. Here's a quick example:

```js
import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-super-dropdown';

class MyDropdown extends Component {
  render () {
    return (
      <Dropdown>
        <DropdownTrigger tagName='a'>Profile</DropdownTrigger>
        <DropdownContent tagName='ul'>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/favorites">Favorites</a>
          </li>
          <li>
            <a href="/logout">Log Out</a>
          </li>
        </DropdownContent>
      </Dropdown>
    );
  }
}
```

### Options

Options can be passed to `Dropdown` as props.A list of available options can be found below. These must be passed to the containing `Dropdown` component.

Property | Type | Description
----- | ----- | -----
**active** | *boolean* | Manually show/hide the `DropdownContent`. Make sure to unset this or the dropdown will stay open.
**onShow** | *function* | Callback for when `DropdownContent` is shown.
**onHide** | *function* | Callback for when `DropdownContent` is hidden.

`DropdownContent` and `DropdownTrigger` components can also be passed the following options as props:

Property | Type | Description
----- | ----- | -----
**tagName** | *string/component* | tagName or component to be used for rendered element
