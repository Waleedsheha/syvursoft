"use client";

import { useRef, useEffect } from "react";

interface MagnetLinesProps {
    rows?: number;
    columns?: number;
    containerSize?: string;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    baseAngle?: number;
    style?: React.CSSProperties;
}

export default function MagnetLines({
    rows = 9,
    columns = 9,
    containerSize = "80vmin",
    lineColor = "#ef4444",
    lineWidth = "1vmin",
    lineHeight = "6vmin",
    baseAngle = 0,
    style,
}: MagnetLinesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll("span");

        const onPointerMove = (e: PointerEvent) => {
            // Mouse position is used to compute angle for each item
            items.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2;
                const itemCenterY = itemRect.top + itemRect.height / 2;

                const deltaX = e.clientX - itemCenterX;
                const deltaY = e.clientY - itemCenterY;

                const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

                // Apply rotation
                (item as HTMLElement).style.transform = `rotate(${angle + 90 + baseAngle}deg)`;
            });
        };

        window.addEventListener("pointermove", onPointerMove);
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
        };
    }, [rows, columns, baseAngle]);

    const total = rows * columns;

    return (
        <div
            ref={containerRef}
            className="grid place-items-center"
            style={{
                width: containerSize,
                height: containerSize,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                ...style,
            }}
        >
            {[...Array(total)].map((_, i) => (
                <span
                    key={i}
                    className="block origin-center pointer-events-none transition-transform will-change-transform"
                    style={{
                        width: lineWidth,
                        height: lineHeight,
                        backgroundColor: lineColor,
                    }}
                />
            ))}
        </div>
    );
}
