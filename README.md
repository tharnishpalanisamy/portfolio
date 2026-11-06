# Tharnish P. — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run build` for the strict TypeScript check and production bundle.

## Personalize before publishing

Edit `personal` near the top of `src/App.tsx` to add an email address and a résumé file path (for example `/resume.pdf`). Project case studies are also in that file; replace clearly marked pending details and repository links once verified. The historical DSA count is static and editable. Availability is shown as unspecified.

The hero architecture illustration is custom SVG/CSS. Scroll reveals use IntersectionObserver and the case study uses Framer Motion. The optional GSAP, Three.js/React Three Fiber, and Lenis packages were left out: the requested visual direction is a restrained systems diagram, and these packages would add weight without improving its clarity.
