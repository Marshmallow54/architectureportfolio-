"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/contexts/motion-context";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollFrameSequenceProps {
    frames: string[];
    label?: string;
    scrollHeightVh?: number;
}

type FrameFit = "cover" | "contain";

function isMobileViewport() {
    return typeof window !== "undefined" && window.innerWidth < 768;
}

function drawFrame(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    fit: FrameFit,
    width: number,
    height: number,
) {
    const ctx = canvas.getContext("2d");
    if (!ctx || !image.complete || !image.naturalWidth || width <= 0 || height <= 0) {
        return;
    }

    const scale =
        fit === "contain"
            ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
            : Math.max(width / image.naturalWidth, height / image.naturalHeight);

    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.fillStyle = "hsl(60 6% 12%)";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export default function ScrollFrameSequence({
    frames,
    label = "Scroll Sequence",
    scrollHeightVh = 320,
}: ScrollFrameSequenceProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mobileFrameRef = useRef<HTMLImageElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const { motionEnabled, reducedMotion } = useMotion();
    const isMobile = useIsMobile();
    const [loadProgress, setLoadProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [mobileFrameSrc, setMobileFrameSrc] = useState(frames[0] ?? "");

    const totalFrames = frames.length;
    const mobileScrollHeight = Math.max(Math.round(scrollHeightVh * 0.65), 220);

    useEffect(() => {
        if (totalFrames === 0) return;

        let cancelled = false;
        imagesRef.current = [];
        setIsReady(false);
        setLoadProgress(0);
        setMobileFrameSrc(frames[0] ?? "");

        let loaded = 0;

        const images = frames.map((src, index) => {
            const image = new Image();
            image.src = src;
            image.decoding = "async";
            image.onload = () => {
                if (cancelled) return;
                loaded += 1;
                setLoadProgress(Math.round((loaded / totalFrames) * 100));
                if (loaded === totalFrames) {
                    setIsReady(true);
                }
            };
            image.onerror = () => {
                if (cancelled) return;
                loaded += 1;
                setLoadProgress(Math.round((loaded / totalFrames) * 100));
                if (loaded === totalFrames) {
                    setIsReady(true);
                }
            };
            imagesRef.current[index] = image;
            return image;
        });

        return () => {
            cancelled = true;
            images.forEach((image) => {
                image.onload = null;
                image.onerror = null;
            });
        };
    }, [frames, totalFrames]);

    useEffect(() => {
        if (!isReady || !sectionRef.current || !canvasContainerRef.current) return;

        registerGsapPlugins();

        const canvas = canvasRef.current;
        const images = imagesRef.current;
        const container = canvasContainerRef.current;
        let isActive = true;

        const getContainerRect = () => {
            const node = canvasContainerRef.current;
            if (!node) return null;

            const rect = node.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return null;

            return rect;
        };

        const resizeCanvas = () => {
            if (!isActive || !canvas || isMobileViewport()) return;

            const rect = getContainerRect();
            if (!rect) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }

            const frame = images[currentFrameRef.current];
            if (frame?.complete) {
                drawFrame(canvas, frame, "cover", rect.width, rect.height);
            }
        };

        const renderFrame = (index: number, force = false) => {
            if (!isActive) return;

            const clamped = Math.max(0, Math.min(index, totalFrames - 1));

            if (!force && clamped === currentFrameRef.current) {
                return;
            }

            currentFrameRef.current = clamped;

            if (isMobileViewport()) {
                setMobileFrameSrc(frames[clamped]);
                if (mobileFrameRef.current) {
                    mobileFrameRef.current.src = frames[clamped];
                }
            } else if (canvas) {
                const rect = getContainerRect();
                const frame = images[clamped];
                if (rect && frame?.complete) {
                    drawFrame(canvas, frame, "cover", rect.width, rect.height);
                }
            }

            if (counterRef.current) {
                counterRef.current.textContent = String(clamped + 1).padStart(3, "0");
            }
        };

        const setup = () => {
            if (!isActive) return;

            if (!isMobileViewport()) {
                resizeCanvas();
            }
            renderFrame(currentFrameRef.current, true);
            ScrollTrigger.refresh();
        };

        setup();

        const resizeObserver = new ResizeObserver(() => {
            if (!isActive) return;

            if (!isMobileViewport()) {
                resizeCanvas();
            }
            renderFrame(currentFrameRef.current, true);
        });
        resizeObserver.observe(container);

        let gsapCtx: gsap.Context | undefined;

        if (motionEnabled && !reducedMotion) {
            gsapCtx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: isMobileViewport() ? 0.55 : 0.75,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (!isActive) return;
                        const frameIndex = Math.round(self.progress * (totalFrames - 1));
                        renderFrame(frameIndex);
                    },
                });
            }, sectionRef);
        }

        window.addEventListener("resize", setup);

        return () => {
            isActive = false;
            window.removeEventListener("resize", setup);
            resizeObserver.disconnect();
            gsapCtx?.revert();
        };
    }, [isReady, motionEnabled, reducedMotion, totalFrames, isMobile, frames]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[hsl(var(--charcoal))]"
            style={{
                height: `${isMobile ? mobileScrollHeight : scrollHeightVh}vh`,
            }}
            aria-label={label}
        >
            <div className="sticky top-0 flex min-h-[100svh] w-full flex-col bg-[hsl(var(--charcoal))] md:block md:h-[100svh]">
                <div className="flex flex-1 items-center justify-center px-3 pb-3 pt-16 md:absolute md:inset-0 md:p-0">
                    <div
                        ref={canvasContainerRef}
                        className="relative w-full max-w-[100vw] aspect-video bg-[hsl(var(--charcoal))] md:h-full md:max-h-none md:aspect-auto md:overflow-hidden"
                    >
                        {/* Mobile: native object-contain — full frame always visible */}
                        <img
                            ref={mobileFrameRef}
                            src={mobileFrameSrc}
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain md:hidden"
                            draggable={false}
                        />

                        {/* Desktop: canvas cover */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 hidden h-full w-full md:block"
                            aria-hidden="true"
                        />

                        {!isReady && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[hsl(var(--charcoal)/0.95)]">
                                <span className="featured-eyebrow">Loading sequence</span>
                                <div className="h-px w-40 overflow-hidden bg-stone-light/20">
                                    <div
                                        className="h-full bg-stone-light/80 transition-all duration-300"
                                        style={{ width: `${loadProgress}%` }}
                                    />
                                </div>
                                <span className="featured-eyebrow opacity-60">
                                    {loadProgress}%
                                </span>
                            </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
                            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--charcoal)/0.92)] via-[hsl(var(--charcoal)/0.35)] to-[hsl(var(--charcoal)/0.45)]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--charcoal)/0.55)] via-transparent to-transparent" />
                        </div>
                    </div>
                </div>

                <div className="relative z-10 shrink-0 border-t border-stone-light/10 bg-[hsl(var(--charcoal))] px-6 py-5 md:absolute md:bottom-0 md:left-0 md:right-0 md:border-t-0 md:bg-transparent md:px-12 md:pb-10">
                    <div className="flex items-end justify-between gap-6">
                        <div className="min-w-0 flex-1 hero-text-shadow">
                            <span className="featured-eyebrow mb-2 block leading-relaxed">
                                {label}
                            </span>
                            <p className="text-body-sm text-stone-light/90 md:max-w-md">
                                {isMobile
                                    ? "Scroll to play the sequence."
                                    : "Scroll to explore the sequence frame by frame."}
                            </p>
                        </div>
                        <div className="shrink-0 text-right hero-text-shadow">
                            <span className="featured-eyebrow mb-1 block opacity-80">
                                Frame
                            </span>
                            <span className="font-serif text-subheading text-stone-light tabular-nums">
                                <span ref={counterRef}>001</span>
                                <span className="opacity-60">
                                    {" "}
                                    / {String(totalFrames).padStart(3, "0")}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
