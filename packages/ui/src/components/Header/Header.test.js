import React from 'react'
import Header from './Header'
import { Button, Drawer } from 'antd'

import { mount } from 'enzyme'

describe('Header must render correctly', () => {
    const wrapper = mount(<Header />)

    it('should contain h1 tag', () => {
        expect(wrapper.find('h1').length).toEqual(1)
    })

    it('should contain Button', () => {
        expect(wrapper.find(Button).length).toEqual(1)
    })

    it('should contain Drawer', () => {
        expect(wrapper.find(Drawer).length).toEqual(1)
    })
})
