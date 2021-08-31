import { mount } from '@vue/test-utils'
import Logo from '@/components/VuetifyLogo'

describe('VuetifyLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})
