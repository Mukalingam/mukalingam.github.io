import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const trail = trailRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const trailPos = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      // Trail follows with more lag
      const trailDelay = 12;
      trailPos.x += (mousePos.x - trailPos.x) / trailDelay;
      trailPos.y += (mousePos.y - trailPos.y) / trailDelay;
      gsap.to(trail, { x: trailPos.x, y: trailPos.y, duration: 0.15 });

      requestAnimationFrame(loop);
    });

    // Magnetic effect for elements with data-magnetic
    document.querySelectorAll("[data-magnetic]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        gsap.to(element, {
          x: dx * 0.2,
          y: dy * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      });
    });

    // Cursor states
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });

    // Scale cursor on click
    document.addEventListener("mousedown", () => {
      cursor.classList.add("cursor-click");
      trail.classList.add("trail-click");
    });
    document.addEventListener("mouseup", () => {
      cursor.classList.remove("cursor-click");
      trail.classList.remove("trail-click");
    });
  }, []);

  return (
    <>
      <div className="cursor-trail" ref={trailRef}></div>
      <div className="cursor-main" ref={cursorRef}></div>
    </>
  );
};

export default Cursor;
