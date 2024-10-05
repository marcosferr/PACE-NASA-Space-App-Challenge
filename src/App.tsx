import { useState } from 'react'
import Chat from './components/Chat'
import Header from './components/Header'

function App() {
  return (
    <main className="min-h-screen flex flex-col w-screen">
      <Header />
      <section className="flex-grow flex px-8 gap-x-8 my-8">
        <section className="bg-green-100 text-green-950 text-3xl font-bold w-2/3 text-center flex flex-col items-center rounded-md border border-green-800">
          HABLAREMOS AQUI DE PLANKTON
        </section>
        <aside className="w-1/3">
          <Chat />
        </aside>
      </section>
    </main>
  )
}

export default App
