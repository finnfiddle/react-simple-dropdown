import React from 'react';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import DropdownTrigger from '../DropdownTrigger';

it('`DropdownTrigger` has custom tag name', () => {
  const wrapper = shallow(<DropdownTrigger tagName='ul' />);
  expect(wrapper.name()).to.equal('ul');
});
