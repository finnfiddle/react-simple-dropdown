import React, { Component, PropTypes } from 'react'

import { omit } from './helpers'

class DropdownTrigger extends Component {

  constructor() {
    super()
    this.displayName = 'DropdownTrigger'
  }

  render() {
    return (
      <this.props.tagName {...omit(this.props, ['tagName', 'children'])}>
        {this.props.children}
      </this.props.tagName>
    );
  }

}

DropdownTrigger.propTypes = {
  onClick: PropTypes.func,
  tagName: PropTypes.string,
}

DropdownTrigger.defaultProps = {
  tagName: 'a',
}

export default DropdownTrigger
