'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { favoritePokemonsAtom } from '@/app/recoil/atoms'
import { Pokemon } from '@/app/types'
import TypeTag from '../type_tag'

export default function FavoritePokemonsList() {
  const router = useRouter()
  const [favoritePokemons, setFavoritePokemons] = useRecoilState(favoritePokemonsAtom)

  return (
    <section className="flex justify-center">
      <section className="max-w-[900px] flex flex-wrap flex-col">
        {
          favoritePokemons.map((pokemon: Pokemon) => (
            <section key={pokemon.name} className="flex">
              <figure className='px-[12px] py-[24px] flex items-center'>
                <button
                  className='cursor-pointer'
                  onClick={() => {
                    console.log('remove')
                    const keptFavorites = favoritePokemons.filter((favorite: Pokemon) => favorite.name !== pokemon.name)
                    setFavoritePokemons(keptFavorites)
                  }}
                >
                  <Image
                    src={'/star.png'}
                    alt={'favorite'}
                    width={32}
                    height={32}
                    priority
                  />
                </button>
              </figure>
              <dl key={pokemon.name} className='w-[300px] py-[24px]'>
                <dt className="px-[4px]">
                  <button className="cursor-pointer" onClick={() => router.push(`/pokemons/${pokemon.name}`)}>
                    <p className="text-xl font-bold underline">
                      {pokemon.name.toUpperCase()}
                    </p>
                  </button>
                </dt>
                <dd className='flex justify-between'>
                  {
                    pokemon.types.map((type: string) => <TypeTag key={`${pokemon.name}-${type}`} pokemon={pokemon.name} type={type} />)
                  }
                </dd>
              </dl>
            </section>
          ))
        }
      </section>
    </section>
  )
}
