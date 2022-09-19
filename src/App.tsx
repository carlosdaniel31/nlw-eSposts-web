import './styles/main.css'
import {MagnifyingGlassPlus} from 'phosphor-react'
import img_logo from './assets/logo-lnw.svg'
import GamerBanner from './components/GamerBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import ModalCreateAd from './components/ModalCreateAd'
import axios from 'axios'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count:{
    ads: number
  }
}

export default function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(()=>{
    axios('http://localhost:8000/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="mx-w-[1344px] mx-auto flex flex-col items-center mt-10 mb-0" >
      <img className='w-52 ' src={img_logo} alt="logo"/>
      <h1 className="text-4xl text-white font-black mt-5">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-5">
        {games.map((game)=>(
          <GamerBanner 
            key={game.id}
            bannerUrl={game.bannerUrl} 
            title= {game.title} 
            adsCount={game._count.ads} />
        ))}
      </div>
      <Dialog.Root>
        <ModalCreateAd/>
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
          <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
            <div>
              <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
              <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
            </div>
            <Dialog.Trigger className='bg-violet-500 hover:bg-violet-600 text-white py-3 px-4 rounded flex items-center gap-3'>
              <MagnifyingGlassPlus size="24"/>
              Publicar anúncio
            </Dialog.Trigger>
          </div>
        </div>
      </Dialog.Root>
    </div>
  )
}