import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionBtn from '../ActionBtn.vue'

describe('ActionBtn', () => {
  it('renders the correct message', () => {
    const msg = 'Get Started'
    const wrapper = mount(ActionBtn, {
      props: {
        msg,
        clickFn: vi.fn() // Pass a mock function
      }
    })
    expect(wrapper.text()).toBe(msg)
  })

  it('calls clickFn when clicked', async () => {
    const clickFn = vi.fn()
    const wrapper = mount(ActionBtn, {
      props: {
        msg: 'Get Started',
        clickFn
      }
    })
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(clickFn).toHaveBeenCalled()
  })
})
