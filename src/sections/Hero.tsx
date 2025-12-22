export default function Hero(){
    return(
        <section
            id = "hero"
            className = "min-h-screen flex items-center justify-center px-6"
        >
            <div className = "max-w-3xl text-center">
                <p className = "text-md textwhite/60 mb-4">📍Toronto, UofT CS</p>
                <h1 className="
                    text-6xl md:text-8xl font-bold tracking-tight
                    transition-all duration-300
                    hover:tracking-normal
                ">
                Hey, I'm <span className="
                        text-6xl md:text-8xl
                        font-bold
                        tracking-wide
                        text-blue-400
                        skew-x-[-5deg]
                        ">
                        Amogh.
                     </span>
                </h1>
                <br/>
                {/* <h1 className = "text-3xl md:text-5xl font-semibold tracking-tighter mb-6">
                    I design and build interactive, 
                    <br/>
                    <span className="text-white/70">
                        high-performance software
                    </span>
                </h1>  */}

                <p className = "text-lg text-white/60 max-w-2xl mx-auto mb-10">
                    I'm a developer in Canada focused on building AI-powered products, games, clean interfaces, and systems that actually ship.
                </p>

                <div className = "flex items-center justify-center gap-4">
                    <a
                        href="#projects"
                        className="
                        px-6 py-3 rounded-full
                        bg-white text-black
                        text-sm font-medium
                        hover:bg-white/90
                        transition
                        "
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="
                        px-6 py-3 
                        rounded-full
                        bg-white text-black
                        text-sm 
                        font-medium
                        hover:bg-white/90
                        transition
                        "
                    >
                        Get in Touch!
                    </a>
                </div>
            </div>
        </section>
    )
}