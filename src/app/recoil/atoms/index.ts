import { atom } from 'recoil'
import { Pokemon } from '@/app/types'

export const favoritePokemonsAtom = atom<Pokemon[]>({
  key: 'favoritePokemons',
  default: [],
})
