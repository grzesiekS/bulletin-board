import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRouteComponent } from './PrivateRoute';

describe('Component PrivateRoute', () => {
  it('should render without crashing', () => {
    const component = shallow(<PrivateRouteComponent />);
    expect(component).toBeTruthy();
  });
});
