import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonItem from '../PokemonItem.vue'
import type { PokemonInfo } from '../../interfaces/PokemonInfo'

describe('PokemonItem', () => {
  const mockPokemon: PokemonInfo = {
    id: 1,
    name: 'Pikachu',
    imageURL: '',
    types: ['Electric'],
    weight: 60,
    height: 4,
    favorite: false
  }

  it('renders properly', () => {
    const wrapper = mount(PokemonItem, {
      props: { pokemon: mockPokemon }
    })
    expect(wrapper.text()).toContain(mockPokemon.name)
  })

  it('emits "update-favorite" event when non-selected star is clicked', async () => {
    const wrapper = mount(PokemonItem, {
      props: { pokemon: mockPokemon }
    })
    const nonStarIconDiv = wrapper.find('.non-favorite-icon div')

    await nonStarIconDiv.trigger('click')

    expect(wrapper.emitted('update-favorite')).toBeTruthy()
    expect(wrapper.emitted('update-favorite')![0]).toEqual([mockPokemon.id])
  })

  it('displays the correct image based on the favorite status', () => {
    const favoritePokemon = { ...mockPokemon, favorite: true }
    const wrapperFavorite = mount(PokemonItem, {
      props: { pokemon: favoritePokemon }
    })
    const starIconDiv = wrapperFavorite.find('.favorite-icon div')
    expect(starIconDiv.exists()).toBe(true)

    const nonFavoritePokemon = { ...mockPokemon, favorite: false }
    const wrapperNonFavorite = mount(PokemonItem, {
      props: { pokemon: nonFavoritePokemon }
    })
    const nonStarIconDiv = wrapperNonFavorite.find('.non-favorite-icon div')
    expect(nonStarIconDiv.exists()).toBe(true)
  })
})
