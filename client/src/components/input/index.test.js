import React from 'react';
import InputLabel from './index';
import { mount, shallow } from 'enzyme';

const setUp = () => {
    const props = {
        title: 'qq11',
        onChange: jest.fn()
    }
    const wrapper = shallow(<InputLabel {...props}></InputLabel>);
    return { wrapper, props };
}

describe('input test', () => {
    const { wrapper, props } = setUp();
    
    it('input init', () => {
        console.log(wrapper.debug())
        const span = wrapper.find('span');
        console.log(span)
        expect(span.text()).toEqual('qq11');
    })
})