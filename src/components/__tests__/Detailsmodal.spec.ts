import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DetailsModal from '../modal/DetailsModal.vue'
import ModalText from '../modal/ModalText.vue'
import ModalImage from '../modal/ModalImage.vue'
import ActionBtn from '../ActionBtn.vue'

describe('DetailsModal', () => {
  const mockPokemon = {
    id: 1,
    name: 'Bulbasaur',
    imageURL: 'https://example.com/bulbasaur.png',
    types: ['Grass', 'Poison'],
    weight: 69,
    height: 7,
    favorite: false
  }

  it('Should render properly', () => {
    const wrapper = mount(DetailsModal, {
      props: { pokemon: mockPokemon },
      global: {
        components: { ModalText, ModalImage, ActionBtn }
      }
    })

    expect(wrapper.text()).toContain(mockPokemon.name)
    expect(wrapper.text()).toContain(mockPokemon.weight.toString())
    expect(wrapper.text()).toContain(mockPokemon.height.toString())
    expect(wrapper.text()).toContain(mockPokemon.types.join(', '))
  })

  it('Should emits "close" event when close button is clicked', async () => {
    const wrapper = mount(DetailsModal, {
      props: { pokemon: mockPokemon },
      global: {
        components: { ModalText, ModalImage, ActionBtn }
      }
    })
    await wrapper.find('.close-button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('Should emits "update-favorite" event when favorite button is clicked', async () => {
    const wrapper = mount(DetailsModal, {
      props: { pokemon: mockPokemon },
      global: {
        components: { ModalText, ModalImage, ActionBtn }
      }
    })
    await wrapper.find('.non-favorite-icon div').trigger('click')
    expect(wrapper.emitted('update-favorite')).toBeTruthy()
  })

  it('Should share pokemon information when share button is clicked', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValueOnce(undefined)
      }
    })

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    const wrapper = mount(DetailsModal, {
      props: { pokemon: mockPokemon },
      global: {
        components: { ModalText, ModalImage, ActionBtn }
      }
    })

    await wrapper.findComponent(ActionBtn).trigger('click')

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${mockPokemon.name} is a ${mockPokemon.types.join(', ')} Pokemon with a weight of ${mockPokemon.weight} and a height of ${mockPokemon.height}`
    )

    expect(alertSpy).toHaveBeenCalledWith(
      `${mockPokemon.name} information has been copied to your clipboard`
    )

    alertSpy.mockRestore()
  })
})
