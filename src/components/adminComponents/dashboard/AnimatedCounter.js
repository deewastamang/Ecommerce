import {
  motion,
  animate,
  useIsomorphicLayoutEffect,
  useInView,
} from "framer-motion";
import React, {useRef } from "react";

const AnimatedCounter = ({ from=0, to=100 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!inView) return;
    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [ref, inView, from, to]);

  return <span ref={ref} />;
};

export default AnimatedCounter;
