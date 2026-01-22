import {motion} from "framer-motion"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"

export default function Contact(){
    return(
        <section
            id = "contact"
            className = "min-h-screen px-4 sm:px-6 py-16 md:py-24 flex items-center justify-center"
        >
            <div className = "w-full max-w-5xl">
                <motion.h2 
                    className = "text-4xl sm:text-5xl md:text-6xl text-indigo-600 dark:text-indigo-500 text-center font-bold tracking-tighter mb-10 md:mb-12"
                    initial = {{opacity: 0, y:16 }}
                    whileInView = {{opacity: 1, y: 0}}
                    viewport = {{once: false}}
                    transition = {{duration: 0.5, ease: "easeOut"}}
                >
                    Get in Touch
                </motion.h2>

                <motion.div 
                    className = "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                    initial = "hidden"
                    whileInView="visible"
                    viewport = {{once: false}}
                    variants = {{
                        hidden: {},
                        visible: {
                            transition: {staggerChildren: 0.15}
                        },
                    }}
                >
                    {/**Contact Card*/}
                    <motion.div 
                        className = "rounded-2xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)] glass p-6 sm:p-8"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                        transition = {{duration: 0.55, ease: "easeOut"}}
                    >
                        <h3 className = "text-xl sm:text-2xl font-medium mb-4">
                            Let's Build something. 
                        </h3>

                        <p className = "text-slate-700 dark:text-white/85 mb-6 sm:mb-8 text-sm sm:text-base">
                            Whether it's a project, collaboration or opportunity - my inbox is always open. 
                            Let's talk about how we can achieve your goals, or connect for a quick chat
                        </p>

                        <div className = "space-y-4">
                            <motion.a 
                                href = "mailto: amoghmerudi@gmail.com"
                                whileHover={{y: -4}}
                                transition={{type: "spring", stiffness: 250, damping: 20}}
                                className="
                                block
                                w-full sm:w-fit
                                px-5 py-3
                                rounded-full
                                bg-slate-900 text-white
                                font-medium
                                hover:bg-slate-800
                                transition
                                dark:bg-white dark:text-black dark:hover:bg-white/90
                                "
                            >
                                Email me
                            </motion.a>

                            <motion.a
                                href = "/resume.pdf"
                                target = "_blank"
                                rel = "noopener noreferrer"
                                whileHover={{y: -4}}
                                transition={{type: "spring", stiffness: 200, damping: 20}}
                                className="
                                    block
                                    w-full sm:w-fit
                                    px-5 py-3
                                    rounded-full
                                    border border-black/20 dark:border-white/20
                                    text-slate-700 dark:text-white/80
                                    hover:text-slate-900 dark:hover:text-white
                                    hover:border-black/40 dark:hover:border-white/40
                                    transition
                                "
                            >
                                View Resume (PDF)
                            </motion.a>
                        </div>
                    </motion.div>

                    {/**Social*/}
                    <motion.div 
                        className = "rounded-2xl border border-black/10 dark:border-white/10 bg-[color:var(--surface)] glass p-6 sm:p-8"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                        transition = {{duration: 0.55, ease: "easeOut"}}                        
                    >
                        <h3 className = "text-xl sm:text-2xl font-medium mb-6">
                            Find me online
                        </h3>

                        <ul className = "space-y-4">
                            <li>
                                <motion.a
                                    href = "https://github.com/AmoghMerudi"
                                    target = "_blank"
                                    rel = "noopener noreferrer"
                                    whileHover={{y: -4}}
                                    transition={{type: "spring", stiffness: 200, damping: 10}}
                                    className="
                                        flex items-center
                                        justify-between
                                        px-3 sm:px-4 py-2.5 sm:py-3
                                        rounded-xl
                                        border border-black/10 dark:border-white/10
                                        hover:border-black/30 dark:hover:border-white/30
                                        hover:bg-black/5 dark:hover:bg-white/5
                                        transition
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <FaGithub className="text-xl" />
                                        <span>GitHub</span>
                                    </div>
                                    <span className = "text-slate-500 dark:text-white/40">→</span>
                                </motion.a>
                            </li>

                            <li>
                                <motion.a
                                    href = "https://www.linkedin.com/in/amogh-merudi-83012836a/"
                                    target = "_blank"
                                    rel = "noopener noreferrer"
                                    whileHover={{y: -4}}
                                    transition={{type: "spring", stiffness: 200, damping: 10}}
                                    className="
                                        flex items-center
                                        justify-between
                                        px-3 sm:px-4 py-2.5 sm:py-3
                                        rounded-xl
                                        border border-black/10 dark:border-white/10
                                        hover:border-black/30 dark:hover:border-white/30
                                        hover:bg-black/5 dark:hover:bg-white/5
                                        transition
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <FaLinkedin className="text-xl" />
                                        <span>LinkedIn</span>
                                    </div>
                                    <span className = "text-slate-500 dark:text-white/40">→</span>
                                </motion.a>
                            </li>

                            <li>
                                <motion.a
                                    href = "https://www.instagram.com/theamoghmerudi/?hl=en"
                                    target = "_blank"
                                    rel = "noopener noreferrer"
                                    whileHover={{y: -4}}
                                    transition={{type: "spring", stiffness: 200, damping: 10}}
                                    className="
                                        flex items-center
                                        justify-between
                                        px-3 sm:px-4 py-2.5 sm:py-3
                                        rounded-xl
                                        border border-black/10 dark:border-white/10
                                        hover:border-black/30 dark:hover:border-white/30
                                        hover:bg-black/5 dark:hover:bg-white/5
                                        transition
                                    "
                                >
                                    <div className="flex items-center gap-3">
                                        <FaInstagram className="text-xl" />
                                        <span>Instagram</span>
                                    </div>
                                    <span className = "text-slate-500 dark:text-white/40">→</span>
                                </motion.a>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}