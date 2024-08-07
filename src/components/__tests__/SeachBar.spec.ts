import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  it('Should render properly', () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search')
  })

  it('Should emit "update-search-term" with the correct value when input changes', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('Pikachu')
    expect(wrapper.emitted('update-search-term')).toBeTruthy()
    expect(wrapper.emitted('update-search-term')![0]).toEqual(['Pikachu'])
  })
})
