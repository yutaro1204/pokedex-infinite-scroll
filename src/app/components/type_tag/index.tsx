'use client'

import pokemonTypeColorProvider from "@/app/utils/pokemonTypeColorProvider"

export default function TypeTag({ pokemon, type}: { pokemon: string, type: string }) {
  return (
    <div className='w-[50%] text-center px-[4px]'>
      <div
        className='rounded-[4px] text-white'
        style={{ backgroundColor: pokemonTypeColorProvider(type) }}
      >
        <p>{type}</p>
      </div>
    </div>
  )
}