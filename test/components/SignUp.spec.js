import { mount } from '@vue/test-utils'
import Dialog from '@/components/SignUp'

describe('SignUp', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Dialog)
    expect(wrapper.vm).toBeTruthy()
  })
})
