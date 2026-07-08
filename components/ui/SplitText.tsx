"use client";

import { createElement, Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/easings";
import { cn } from "@/lib/cn";

export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return createElement(Tag, { className }, text);
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em]" aria-hidden>
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
              transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE_OUT_EXPO }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}
