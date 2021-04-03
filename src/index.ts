import { createElement as r, useEffect, useRef, useState } from "react";
import { render } from "react-dom";

const STRETCH_MIN = 60;
const STRETCH_MAX = 130;

const WEIGHT_MIN = 100;
const WEIGHT_MAX = 1000;

const DURATION_MIN = 500;
const DURATION_MAX = 1200;

const SUSTAIN_MIN = 1000;
const SUSTAIN_MAX = 3000;

const coefToX = (min: number, max: number) => (k: number) => min + (max - min) * k;

const coefToStretch = coefToX(STRETCH_MIN, STRETCH_MAX);
const coefToWidth = coefToX(WEIGHT_MIN, WEIGHT_MAX);
const coefToDuration = coefToX(DURATION_MIN, DURATION_MAX);
const coefToSustain = coefToX(SUSTAIN_MIN, SUSTAIN_MAX);

function easeOutElastic(x: number): number {
  const c4 = (2 * Math.PI) / 3;

  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

const Transition = ({
  children,
  duration,
  startS,
  endS,
  startW,
  endW,
}: {
  children: string;
  duration: number;
  startS: number;
  endS: number;
  startW: number;
  endW: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const f = (t: number): void => {
      const diff = t - n;
      if (diff >= duration) {
        return;
      }
      const ratio = diff / duration;
      const apRatio = easeOutElastic(ratio);
      if (ref.current) {
        ref.current.style.fontStretch = `${apRatio * (endS - startS) + startS}%`;
        ref.current.style.fontWeight = `${apRatio * (endW - startW) + startW}`;
      }

      r = requestAnimationFrame(f);
    };
    const n = performance.now();
    let r = requestAnimationFrame(f);

    return () => cancelAnimationFrame(r);
  }, [duration, startS, endS, startW, endW]);

  return r("span", { ref }, children);
};

const Animated = ({ children }: { children: string }) => {
  const [s, ss] = useState({
    startS: coefToStretch(Math.random()),
    endS: coefToStretch(Math.random()),
    startW: coefToWidth(Math.random()),
    endW: coefToWidth(Math.random()),
    duration: coefToDuration(Math.random()),
    sustain: coefToSustain(Math.random()),
  });

  useEffect(() => {
    const f = () => {
      ss((s) => ({
        startS: s.endS,
        endS: coefToStretch(Math.random()),
        startW: s.endW,
        endW: coefToWidth(Math.random()),
        duration: coefToDuration(Math.random()),
        sustain: coefToSustain(Math.random()),
      }));
    };
    const t = setTimeout(f, s.duration + s.sustain);

    return () => clearTimeout(t);
  }, [children, s]);

  return r(Transition, {
    children,
    duration: s.duration,
    startS: s.startS,
    endS: s.endS,
    startW: s.startW,
    endW: s.endW,
  });
};

render(
  r(
    "div",
    {
      style: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "5rem",
      },
    },
    r(Animated, { children: "A" }),
    r(Animated, { children: "T" }),
    r(Animated, { children: "N" }),
    r(Animated, { children: "D" }),
    r(Animated, { children: "R" }),
  ),
  document.getElementById("app"),
);
