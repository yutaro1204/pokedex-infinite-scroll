'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { fetchPokemon } from '@/app/api'
import TypeTag from '../type_tag'

export function PokemonDetail({ pokemon }: { pokemon: string }) {
  const { data } = useQuery({ queryKey: ['pokemon'], queryFn: () => fetchPokemon(pokemon) })

  return (
    <section className="flex justify-center">
      <section className="max-w-[900px] flex flex-wrap">
        <figure className="w-full flex justify-center">
          <Image
            src={data!.icon}
            alt={data!.name}
            width={240}
            height={240}
            priority
          />
        </figure>
        <dt className="w-full text-center py-[10px]">
          <p className="text-xl font-bold">
            {data!.name.toUpperCase()}
          </p>
        </dt>
        <dd className="w-full flex justify-center">
          {
            data!.types.map((type: string) => <TypeTag key={`${data!.name}-${type}`} pokemon={data!.name} type={type} />)
          }
        </dd>
      </section>
    </section>
  )
}