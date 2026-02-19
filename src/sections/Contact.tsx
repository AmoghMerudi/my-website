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
                    className = "text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white text-center font-extrabold tracking-tight mb-10 md:mb-12"
                    initial = {{opacity: 0, y:16 }}
                    whileInView = {{opacity: 1, y: 0}}
                    viewport = {{once: false}}
                    transition = {{duration: 0.5, ease: "easeOut"}}
                >
                    Get in <span className="accent-text">Touch</span>
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
                        className = "rounded-2xl bg-[color:var(--surface)] glass p-6 sm:p-8"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                        transition = {{duration: 0.55, ease: "easeOut"}}
                    >
                        <h3 className = "text-xl sm:text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                            Let&apos;s build something meaningful
                        </h3>

                        <p className = "text-slate-600 dark:text-white/65 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                            Whether it&apos;s a project, collaboration, or just a quick
                            hello, my inbox is open.
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
                                hover:opacity-90
                                transition
                                dark:bg-white dark:text-black dark:hover:opacity-90
                                "
                            >
                                Email Me
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
                                    border border-black/15 dark:border-white/20
                                    text-slate-700 dark:text-white/80
                                    bg-[color:var(--surface)]
                                    glass
                                    hover:bg-black/5 dark:hover:bg-white/10
                                    transition
                                "
                            >
                                View Resume (PDF)
                            </motion.a>
                        </div>
                    </motion.div>

                    {/**Social*/}
                    <motion.div 
                        className = "rounded-2xl bg-[color:var(--surface)] glass p-6 sm:p-8"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                        transition = {{duration: 0.55, ease: "easeOut"}}                        
                    >
                        <h3 className = "text-xl sm:text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
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
                                        bg-[color:var(--surface-strong)]
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
                                        bg-[color:var(--surface-strong)]
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
                                        bg-[color:var(--surface-strong)]
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