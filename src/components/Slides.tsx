import CardCarousel from "./CardCarousel";
import data from "../data/facts.json"

const Slides = () => {
    return (
        <section 
        className="relative bg-zinc-50 text-green-950 text-3xl font-bold w-2/3 text-pretty flex flex-col rounded-md border border-zinc-800">
            <CardCarousel/>
        </section>
    );
}

export default Slides;