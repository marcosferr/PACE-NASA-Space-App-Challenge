import CardCarousel from "./CardCarousel";

const Slides = () => {
    return (
        <section 
        className="relative bg-zinc-50 w-2/3 text-pretty flex flex-col rounded-md border border-zinc-800">
            <CardCarousel/>
        </section>
    );
}

export default Slides;