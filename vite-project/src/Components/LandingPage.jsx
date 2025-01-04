import React, { useState, useEffect } from "react";
import Star from '../assets/Star.png';
import Command from '../assets/Commando.png';

function LandingPage() 
{
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (isHovering) {
        setParticles((prevParticles) => [
          ...prevParticles,
          {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            life: 1,
          },
        ]);
      }
    };

    const handleParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            life: particle.life - 0.02,
          }))
          .filter((particle) => particle.life > 0)
      );
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener('mouseup', handleMouseMove);
      window.addEventListener('mouseon', handleMouseMove);
      const interval = setInterval(handleParticles, 16);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        clearInterval(interval);
      };
    }
  }, [isHovering]);


  useEffect(() => {
    if (!isHovering) {
      setParticles([]);
    }
  }, [isHovering]);


  return (
    <section className="min-h-screen w-[100%] bg-[#e3b8b8] relative overflow-hidden">
      <div className="h-[60vh] w-full bg-[#151515] rounded-b-[2.5rem] grid place-content-center relative">
        <div 
            className="w-[80vw] h-[20rem] flex flex-col items-center justify-center bg-[#C73659] rounded-[3rem] cursor-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
          <span className="text-center whitespace-nowrap text-[2.5rem] block neon-text font-semibold tracking-wider font-Noto">Hi!</span>
          <span className="text-center text-[2.5rem] font-bold text-slate-100">
            I am <span className="text-[#FFF455]">George Kurian Thomas</span>
          </span>
        </div>
        
        { particles.map((particle) => (
            <div
                key={particle.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                    width: `${15 * particle.life}px`,
                    height: `${15 * particle.life}px`,
                    background: `radial-gradient(circle, rgba(255,255,255,0.8), transparent)`,
                    top: particle.y,
                    left: particle.x,
                    transform: "translate(-50%, -50%)",
                    opacity: particle.life,
                }}
            >

            </div>
            ))
        }
      </div>

      <div className="h-[40vh] w-full flex flex-row items-center justify-between px-4">
        <img src={ Star } alt="Necromancer" className="" />
        <div className="bg-[#151515] p-4 h-[40vh] w-[30%] grid place-content-center">
            <img src={ Command } alt="Necromancer" className="" />
        </div>
        <img src={ Star } alt="Necromancer" className="" />
      </div>
    </section>
  );
}

export default LandingPage;
