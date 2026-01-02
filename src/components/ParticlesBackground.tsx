"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
    color?: string;
    particleCount?: number;
    className?: string;
}

// Particle data structure
interface ParticleData {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

// Factory function to create a particle
function createParticle(width: number, height: number): ParticleData {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1, // Size between 1 and 4
        speedX: Math.random() * 1 - 0.5, // Speed between -0.5 and 0.5
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.1,
    };
}

// Update particle position
function updateParticle(particle: ParticleData, width: number, height: number): void {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap around screen
    if (particle.x > width) particle.x = 0;
    else if (particle.x < 0) particle.x = width;
    if (particle.y > height) particle.y = 0;
    else if (particle.y < 0) particle.y = height;
}

// Draw particle
function drawParticle(
    ctx: CanvasRenderingContext2D,
    particle: ParticleData,
    color: string
): void {
    ctx.fillStyle = color;
    ctx.globalAlpha = particle.opacity;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
}

export default function ParticlesBackground({
    color = "#ea580c",
    particleCount = 50,
    className = "",
}: ParticlesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: ParticleData[] = [];

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                updateParticle(particle, canvas.width, canvas.height);
                drawParticle(ctx, particle, color);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, particleCount]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-0 pointer-events-none ${className}`}
        />
    );
}
