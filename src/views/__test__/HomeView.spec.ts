import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import router from '@/router'

// Mock para evitar que la navegacion haciendo la prueba
vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('HomeView', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders properly', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('Welcome to the Pokedex')
  })

  it('Navigates to dashboard page', async () => {
    const wrapper = mount(HomeView)
    const btn = wrapper.find('button')

    await btn.trigger('click')

    expect(router.push).toHaveBeenCalledWith('/dashboard')
  })
})
