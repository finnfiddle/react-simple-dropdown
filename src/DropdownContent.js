import React, { Component, PropTypes } from 'react'

import { omit } from './helpers'

class DropdownContent extends Component {

  constructor() {
    super()
    this.displayName = 'DropdownContent'
  }

  render() {
    return (
      <this.props.tagName {...omit(this.props, ['tagName', 'children'])}>
        {this.props.children}
      </this.props.tagName>
    )
  }

}

DropdownContent.propTypes = {
  tagName: PropTypes.string,
}

DropdownContent.defaultProps = {
  tagName: 'div',
}

export default DropdownContent
