import {motion} from "framer-motion"

export default function Hero(){
    return(
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
        >
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div
                className="
                  absolute top-[15%] left-[20%]
                  w-[400px] h-[200px]
                  bg-white/45
                  rounded-full
                  blur-[140px]
                "
              />
            </div>
            <motion.div 
                className = "max-w-3xl text-center"
                initial = {{opacity: 0, y: 24}}
                animate = {{opacity: 1, y: 0}}
                transition = {{duration: 0.9, ease: "easeOut"}}
            >
                <motion.p 
                    className = "text-sm sm:text-md text-slate-700 dark:text-white mb-4"
                    initial = {{opacity: 0, y:10}}
                    animate = {{opacity: 1, y:10}}
                    transition={{delay: 0.2}}
                >
                    📍Toronto, UofT CS
                </motion.p>

                <motion.h1
                    className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    >
                    Hey, I'm{" "}
                    <motion.span
                        className="
                        text-4xl sm:text-6xl md:text-8xl
                        font-bold
                        tracking-wide
                        text-blue-500 dark:text-blue-400
                        skew-x-[-5deg]
                        inline-block
                        "
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                    >
                        Amogh.
                    </motion.span>
                </motion.h1>
                <br/>

                {/* <h1 className = "text-3xl md:text-5xl font-semibold tracking-tighter mb-6">
                    I design and build interactive, 
                    <br/>
                    <span className="text-white/70">
                        high-performance software
                    </span>
                </h1>  */}

                <motion.div
                    initial = {{opacity: 0, y: 12}}
                    animate = {{opacity: 1, y: 0}}
                    transition = {{delay: 0.6}}
                >
                    <p className = "text-base sm:text-lg text-slate-600 dark:text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10">
                    I'm a developer in Canada focused on building AI-powered products, games, clean interfaces, and systems that actually ship.
                    </p>

                    <div className = "flex items-center justify-center gap-4 flex-wrap">
                        {/* <motion.a
                            href="#projects"
                            whileHover={{y: -4}}
                            transition={{type: "spring", stiffness: 250, damping: 20}}
                            className="
                            px-6 py-3 rounded-full
                            bg-white text-black
                            text-sm font-medium
                            hover:bg-white/90
                            transition
                            "
                        >
                            View Projects
                        </motion.a> */}

                        <motion.a
                            href="#contact"
                            whileHover={{y: -4}}
                            transition={{type: "spring", stiffness: 250, damping: 20}}
                            className="
                            px-6 py-3 
                            rounded-full
                            bg-slate-900 text-white
                            text-sm 
                            font-medium
                            hover:bg-slate-800
                            transition
                            dark:bg-white dark:text-black dark:hover:bg-white/90
                            "
                        >
                            Get in Touch!
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}