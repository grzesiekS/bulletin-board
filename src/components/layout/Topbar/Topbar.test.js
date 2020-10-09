import React from 'react';
import { shallow } from 'enzyme';
import { TopbarComponent } from './Topbar';

describe('Component Topbar', () => {
  it('should render without crashing', () => {
    const component = shallow(<TopbarComponent />);
    expect(component).toBeTruthy();
  });
});
