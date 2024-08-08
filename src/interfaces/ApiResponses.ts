export interface getAllPokemonsApiResponse {
  count: number
  next: string
  previous: any
  results: PokemonWithURL[]
}

export interface PokemonWithURL {
  name: string
  url: string
  favorite: boolean
}
