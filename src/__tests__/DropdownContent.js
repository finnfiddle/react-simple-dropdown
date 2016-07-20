import React from 'react';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import DropdownContent from '../DropdownContent';

it('`DropdownContent` has custom tag name', () => {
  const wrapper = shallow(<DropdownContent tagName='li' />);
  expect(wrapper.name()).to.equal('li');
});
