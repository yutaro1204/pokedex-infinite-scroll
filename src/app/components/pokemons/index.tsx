'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemons, fetchMorePokemons } from '@/app/api'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { RotatingLines } from  'react-loader-spinner'
import { useRecoilState } from 'recoil'
import { Pokemon } from '@/app/types'
import { favoritePokemonsAtom } from '@/app/recoil/atoms'
import TypeTag from '../type_tag'

export function PokemonsList() {
  const router = useRouter()
  const { data } = useQuery({ queryKey: ['pokemons'], queryFn: fetchPokemons })
  const [favoritePokemons, setFavoritePokemons] = useRecoilState(favoritePokemonsAtom)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextPage, setNextPage] = useState<string>()

  const refetch = async () => {
    if (!nextPage) return

    const res = await fetchMorePokemons(nextPage)

    if (res.results.length === 0) return

    setPokemons([
      ...pokemons,
      ...res.results
    ])
    setNextPage(res.next)
  }

  const checkFavorites = (pokemon: string) => {
    return favoritePokemons.map((favorite: Pokemon) => favorite.name).includes(pokemon)
  }

  const removeFavorite = (pokemon: string) => {
    const keptFavorites = favoritePokemons.filter((favorite: Pokemon) => favorite.name !== pokemon)
    setFavoritePokemons(keptFavorites)
  }

  useEffect(() => {
    if (data) {
      setPokemons(data.results)
      setNextPage(data.next)
    }
  }, [data])

  return (
    <section className="flex justify-center">
      <InfiniteScroll
        pageStart={0}
        loadMore={refetch}
        initialLoad={false}
        hasMore={true || false}
        loader={
          (
            <div className="w-full flex justify-center py-[100px]" key={0}>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
                />
            </div>
          )
        }
      >
        <section className="max-w-[900px] flex flex-wrap">
          {
            pokemons.map((pokemon: Pokemon) => (
              <dl key={pokemon.name} className="w-[300px] flex justify-center flex-wrap py-[24px] relative">
                {
                  checkFavorites(pokemon.name) && (
                    <figure className='absolute top-[24px] left-[0px]'>
                      <button
                        onClick={() => removeFavorite(pokemon.name)}
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
                  )
                }
                {
                  pokemon.icon && (
                    <button onClick={() => router.push(`/pokemons/${pokemon.name}`)}>
                      <Image
                        src={pokemon.icon}
                        alt={pokemon.name}
                        width={240}
                        height={240}
                        priority
                      />
                    </button>
                  )
                }
                <dt className="w-full text-center py-[10px]">
                  <button onClick={() => router.push(`/pokemons/${pokemon.name}`)}>
                    <p className="text-xl font-bold">
                      {pokemon.name.toUpperCase()}
                    </p>
                  </button>
                </dt>
                <dd className="w-full flex justify-center">
                  {
                    pokemon.types.map((type: string) => <TypeTag key={`${pokemon.name}-${type}`} pokemon={pokemon.name} type={type} />)
                  }
                </dd>
                <div className='w-full p-[4px]'>
                  {
                    checkFavorites(pokemon.name) ? (
                      <button
                        className='bg-[#273746] w-full rounded-[4px] text-white'
                        onClick={() => removeFavorite(pokemon.name)}
                      >
                        <p>Remove from favorites</p>
                      </button>
                    ) : (
                      <button
                        className='bg-[#F5B7B1] w-full rounded-[4px] text-white'
                        onClick={() => {
                          setFavoritePokemons([
                            ...favoritePokemons,
                            {
                              name: pokemon.name,
                              icon: pokemon.icon,
                              types: pokemon.types.map((type: string) => type)
                            }
                          ])
                        }}
                      >
                        <p>Mark as a favorite</p>
                      </button>
                    )
                  }
                </div>
              </dl>
            ))
          }
        </section>
      </InfiniteScroll>
    </section>
  )
}
