import CardCarousel from "./CardCarousel";

const Slides = () => {
    return (
        <section 
        className="relative  w-2/3 text-pretty flex flex-col shadow-sm  h-full bg-white p-6 rounded-lg border border-[#e5e7eb] overflow-hidden ">
            <CardCarousel/>
        </section>
    );
}

export default Slides;