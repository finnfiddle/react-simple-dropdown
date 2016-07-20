import React from 'react';

import { mount } from 'enzyme';
import { expect } from 'chai';

import Dropdown, { DropdownTrigger, DropdownContent } from '../index';

it('triggers menu on click trigger', () => {
  const wrapper = mount(
    <Dropdown>
      <DropdownTrigger />
      <DropdownContent>
        <blockquote>yup</blockquote>
      </DropdownContent>
    </Dropdown>
  );
  expect(wrapper.find('blockquote').length).to.equal(0);
  wrapper.find('a').simulate('click');
  expect(wrapper.find('blockquote').length).to.equal(1);
});

it('shows menu when `active` prop is true', () => {
  const wrapper = mount(
    <Dropdown active={true}>
      <DropdownTrigger />
      <DropdownContent>
        <blockquote>yup</blockquote>
      </DropdownContent>
    </Dropdown>
  );
  expect(wrapper.find('blockquote').length).to.equal(1);
  wrapper.setProps({ active: false });
  expect(wrapper.find('blockquote').length).to.equal(0);
});
