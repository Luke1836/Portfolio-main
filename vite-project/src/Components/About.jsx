import React, { useState, useEffect, useRef } from 'react';
import Figurine from '../assets/Figurine.png';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState({
    text1: "I am",
    text2: "George Kurian Thomas",
    text3: "B-Tech Computer Science Student at",
    text4: "the College of Engineering Trivandrum."
  });

  const imageRef = useRef(null);
  const alpahbets = "ABCDEFGHIJKLMNOPQRSTUVWXY";
  let interval = null;

  // Intersection Observer to detect if the image section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.8 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleTextClick = (textKey) => {
    let iteration = 0;
    clearInterval(interval);

    // Save the original text content
    const originalText = text[textKey];

    interval = setInterval(() => {
      setText((prevState) => ({
        ...prevState,
        [textKey]: originalText
          .split("")
          .map((alphabet, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return alpahbets[Math.floor(Math.random() * 26)];
          })
          .join("")
      }));

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 20);
  };

  return (
    <section className="min-h-screen w-[100%] bg-[#151515] relative overflow-hidden">
      <p className="w-[100%] h-[85vh] text-[3.5rem] text-[#C73659]">
        <span
          className="block px-2 py-[1rem] border-b-[3px] border-dashed border-[#ff2e8c] mx-8"
          onMouseOver={() => handleTextClick('text1')}
        >
          {text.text1}
        </span>
        <span
          className="block px-2 py-[1rem] border-b-[3px] border-dashed border-[#ff2e8c] mx-8"
          onMouseOver={() => handleTextClick('text2')}
        >
          {text.text2}
        </span>
        <span
          className="block px-2 py-[1rem] border-b-[3px] border-dashed border-[#ff2e8c] mx-8"
          onMouseOver={() => handleTextClick('text3')}
        >
          {text.text3}
        </span>
        <span
          className="block px-2 py-[1rem] border-b-[3px] border-dashed border-[#ff2e8c] mx-8"
          onMouseOver={() => handleTextClick('text4')}
        >
          {text.text4}
        </span>
      </p>
      <img
        src={Figurine}
        className="absolute top-[40%] w-[25rem] left-[76%]"
        ref={imageRef}
      />
    </section>
  );
}

export default About;
