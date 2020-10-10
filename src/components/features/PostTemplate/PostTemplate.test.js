import React from 'react';
import { shallow } from 'enzyme';
import { PostTemplateComponent } from './PostTemplate';

describe('Component PostTemplate', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostTemplateComponent />);
    expect(component).toBeTruthy();
  });
});
