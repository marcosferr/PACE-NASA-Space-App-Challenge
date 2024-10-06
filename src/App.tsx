import { useState } from 'react'
import Chat from './components/Chat'
import Header from './components/Header'
import Slides from './components/Slides'

function App() {
  const [showSlides, setShowSlides] = useState(true);
  
  return (
    <main className="min-h-screen flex flex-col w-screen">
      <Header />
      <button 
        onClick={() => setShowSlides(!showSlides)} 
        className="self-start bg-zinc-900 px-2 py-1 mx-8 text-white text-xsm rounded"
      >
        {showSlides ? 'Hide Slides' : 'Show Slides'}
      </button>
      <section className="flex-grow flex px-8 gap-x-8 my-8">
     
        {showSlides && <Slides />}
        <aside className={showSlides ? "w-1/3" : "w-full"}>
          <Chat />
        </aside>
      </section>
    </main>
  )
}

export default App