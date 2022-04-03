import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import ImageLink from "../components/ImageLink/index";
import Loader from "../components/Loader";
import jsonData from "../data.json";
import { defaultTransition } from "../utils/transition";

export type DataType = {
  cover: string;
  title: string;
  color: string;
  slug: string;
};

const gridUtils = [600, 400, 600, 800, 600];

export default function Home() {
  const [gridVisible, setGridVisible] = useState(true);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const loaderControls = useAnimation();
  const animation = useAnimation();
  const mapData: DataType[] = Array.from(jsonData);

  const bgColor = useMotionValue("black");
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    async function sequence() {
      await animation.set((index) => ({
        y: gridUtils[index % 5],
        scale: 1.1,
      }));

      await animation.start((index) => ({
        y: 0,
        transition: defaultTransition,
      }));
      bgColor.set("white");

      await animation.start({
        scale: 1,
        transition: defaultTransition,
      });

      setGridVisible(false);
    }

    setTimeout(() => {
      loaderControls.start({
        opacity: 0,
        transition: defaultTransition,
      });

      sequence();
    }, 2000);
  }, []);

  const handleGridParallax = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (gridRef.current) {
      const speed = -10;
      const { width, height } = gridRef.current.getBoundingClientRect();
      const offsetX = event.pageX - width * 0.5;
      const offsetY = event.pageY - height * 0.5;

      const newTransformX = (offsetX * speed) / 100;
      const newTransformY = (offsetY * speed) / 100;

      x.set(newTransformX);
      y.set(newTransformY);
    }
  };


  const xMotion = useSpring(x, {stiffness: 400, damping: 90})
  const yMotion = useSpring(y, {stiffness: 400, damping: 90})
  return (
    <>
      <Loader title={"Cities"} loaderControls={loaderControls} />
      <Header
        view={gridVisible}
        toggleView={(value) => setGridVisible(value)}
      />
      <motion.div
        className="content"
        style={{
          backgroundColor: bgColor,
          transition: "background-color 1.25s ease-in-out",
        }}
      >
        {gridVisible && (
          <div className="grid-container">
            <motion.div
              onMouseMove={handleGridParallax}
              ref={gridRef}
              className="grid-elements"
              transition={defaultTransition}
              style={{
                x: xMotion,
                y: yMotion,
              }}
            >
              {mapData.map((element, index) => (
                <motion.div
                  className="element"
                  key={element.slug}
                  animate={animation}
                  custom={index}
                >
                  <div className="thumbnail-wrapper">
                    <ImageLink element={element} index={index} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        {!gridVisible && (
          <div className="list-element">
            {mapData.map((element, index) => (
              <div className="element">
                <ImageLink element={element} index={index} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
