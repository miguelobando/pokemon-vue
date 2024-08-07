import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardView from '../DashboardView.vue'
import SearchBar from '../../components/SearchBar.vue'
import PokemonItem from '../../components/PokemonItem.vue'
import NotFoundPokemon from '../../components/NotFoundPokemon.vue'
import { pokemonInfomock } from '../../components/mocks/pokemonInfoMock'

const MOCKED_NAME = 'Venusaur'
const NON_EXISTENT_NAME = 'NonExistentPokemon'

describe('DashboardView', () => {
  it('Should render properly', () => {
    const wrapper = mount(DashboardView, {
      global: {
        components: { SearchBar, PokemonItem, NotFoundPokemon }
      }
    })
    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.list').exists()).toBe(true)
  })

  it('Should filter pokemons based on search term', async () => {
    const wrapper = mount(DashboardView, {
      global: {
        components: { SearchBar, PokemonItem, NotFoundPokemon }
      }
    })

    const searchBar = wrapper.findComponent(SearchBar)
    await searchBar.vm.$emit('update-search-term', MOCKED_NAME)

    const displayedPokemons = wrapper.findAllComponents(PokemonItem)
    expect(displayedPokemons.length).toBe(1)
    expect(displayedPokemons[0].props().pokemon.name).toBe(MOCKED_NAME)
  })

  it('Should reset the pokemon list when search term is empty', async () => {
    const wrapper = mount(DashboardView, {
      global: {
        components: { SearchBar, PokemonItem, NotFoundPokemon }
      }
    })

    const searchBar = wrapper.findComponent(SearchBar)
    await searchBar.vm.$emit('update-search-term', MOCKED_NAME)
    await searchBar.vm.$emit('update-search-term', '')

    const displayedPokemons = wrapper.findAllComponents(PokemonItem)
    expect(displayedPokemons.length).toBe(pokemonInfomock.length)
  })

  it('Should update favorite status of a pokemon', async () => {
    const wrapper = mount(DashboardView, {
      global: {
        components: { SearchBar, PokemonItem, NotFoundPokemon }
      }
    })

    const pokemonItem = wrapper.findComponent(PokemonItem)
    await pokemonItem.vm.$emit('update-favorite', pokemonInfomock[0].id)

    const updatedPokemonItem = wrapper.findComponent(PokemonItem)
    expect(updatedPokemonItem.props().pokemon.favorite).toBe(true)
  })

  it('Should show NotFoundPokemon component when no pokemons are found', async () => {
    const wrapper = mount(DashboardView, {
      global: {
        components: { SearchBar, PokemonItem, NotFoundPokemon }
      }
    })

    const searchBar = wrapper.findComponent(SearchBar)
    await searchBar.vm.$emit('update-search-term', NON_EXISTENT_NAME)

    expect(wrapper.findComponent(NotFoundPokemon).exists()).toBe(true)
    expect(wrapper.findAllComponents(PokemonItem).length).toBe(0)
  })
})
