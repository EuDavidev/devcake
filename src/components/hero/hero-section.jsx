"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Coffee, Keyboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/common/rating-stars";
import { heroSlides } from "@/data/produtos";

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? "28%" : "-28%",
        opacity: 0,
        scale: 1.03,
        filter: "blur(1.5px)",
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
    },
    exit: (direction) => ({
        x: direction > 0 ? "-28%" : "28%",
        opacity: 0,
        scale: 1.02,
        filter: "blur(1.5px)",
    }),
};

export function HeroSection() {
    const [[active, direction], setActiveSlide] = useState([0, 1]);

    const paginate = (newDirection) => {
        setActiveSlide(([prevActive]) => [
            (prevActive + newDirection + heroSlides.length) % heroSlides.length,
            newDirection,
        ]);
    };

    const goToSlide = (nextIndex) => {
        setActiveSlide(([prevActive]) => [nextIndex, nextIndex >= prevActive ? 1 : -1]);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const slide = heroSlides[active];

    return (
        <section id="inicio" className="relative overflow-hidden pt-28 md:pt-32">
            <div className="absolute inset-0 -z-10 grain-bg" />
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-14 md:grid-cols-2 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center rounded-full border border-browndev/20 bg-rosecake px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                        Confeitaria + Cultura Dev
                    </div>

                    <h1 className="font-title text-4xl font-black leading-tight text-browndev sm:text-5xl lg:text-6xl">
                        # DevCake
                        <span className="mt-2 block text-browndev/90"># {slide.title}!</span>
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-browndev/85 sm:text-lg">
                        Nossa história mistura confeitaria artesanal com rotina de dev: receitas pensadas para acompanhar
                        deploys, reuniões e madrugadas de código sem perder o sabor da casa.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button asChild size="lg" className="font-title text-base">
                            <a href="#contato">Encomendar Meu Bolo</a>
                        </Button>
                        <RatingStars value={5} size="lg" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-browndev/80 sm:text-sm">
                        <span className="inline-flex items-center gap-1 rounded-full bg-rosecake px-3 py-1"><Keyboard className="h-4 w-4" /> teclado</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-creamcake px-3 py-1"><Code2 className="h-4 w-4" /> código</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-orangecake px-3 py-1"><Coffee className="h-4 w-4" /> café</span>
                    </div>
                </motion.div>

                <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-browndev/15 bg-browndev/10 shadow-xl sm:h-[500px]">
                    <AnimatePresence initial={false} custom={direction} mode="sync">
                        <motion.div
                            key={slide.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={active === 0} />
                            <div className="absolute inset-0 bg-gradient-to-t from-browndev/95 via-browndev/65 via-45% to-browndev/12" />
                            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-rosecakeLight/55 bg-gradient-to-t from-browndev/95 to-browndev/78 px-4 pb-8 pt-4 shadow-xl backdrop-blur-md">
                                <p className="font-title text-xl font-bold text-white drop-shadow-md">{slide.title}</p>
                                <p className="text-sm text-rosecakeLight">{slide.description}</p>
                                <div className="pointer-events-none absolute bottom-1 left-4 right-4 flex items-center gap-3">
                                    <span className="h-px flex-1 bg-rosecakeLight/35" />
                                    <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-rosecakeLight/35 bg-browndev/70 px-2 py-1 shadow-md backdrop-blur-sm">
                                        {heroSlides.map((item, index) => (
                                            <button
                                                key={item.id}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${index === active ? "w-6 bg-rosecake" : "w-2.5 bg-rosecakeLight/45 hover:bg-rosecakeLight/80"}`}
                                                onClick={() => goToSlide(index)}
                                                aria-label={`Ir para slide ${item.title}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="h-px flex-1 bg-rosecakeLight/35" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
