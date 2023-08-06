'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <header className="px-[24px] h-[80px] bg-[#FF5733] flex items-center shadow-md justify-between">
      <button onClick={() => router.push('/pokemons')}>
        <h1 className="text-2xl font-bold text-[#FDF2E9]">Pokedex</h1>
      </button>
      <button onClick={() => router.push('/pokemons/favorites')}>
        <h1 className="text-xl text-[#FDF2E9]">Favorites</h1>
      </button>
    </header>
  )
}
