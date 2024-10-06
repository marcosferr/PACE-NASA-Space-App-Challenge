import { useState } from 'react';
import Chat from './Chat';
import Header from './Header';
import Slides from './Slides';
import SideBarCollapseIcon from './icons/SideBarCollapse';
import SideBarExpandIcon from './icons/SideBarExpand';

function MainApp() {
  const [showSlides, setShowSlides] = useState(true);

  return (
    <main className="min-h-screen flex flex-col w-screen">
      <Header />
      <button
        onClick={() => setShowSlides(!showSlides)}
        className="self-start bg-zinc-100 px-2 py-1 mx-8 rounded hover:bg-zinc-300 transition-all ease-in-out duration-200 active:scale-90 border boder-zinc-300"
      >
        {showSlides ? <SideBarCollapseIcon/> : <SideBarExpandIcon/>}
      </button>

      <section className="flex-grow flex px-8 gap-x-4 my-2">
        {showSlides && <Slides />}

        {/* Chat aside section */}
        <aside className={showSlides ? "w-1/3" : "w-full"}>
          <Chat />
        </aside>
      </section>
    </main>
  );
}

export default MainApp;
