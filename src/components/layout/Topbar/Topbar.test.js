import React from 'react';
import { shallow } from 'enzyme';
import { TopbarComponent } from './Topbar';

describe('Component Topbar', () => {
  it('should render without crashing', () => {
    const users = [];
    const component = shallow(<TopbarComponent users={users} />);
    expect(component).toBeTruthy();
  });
});
