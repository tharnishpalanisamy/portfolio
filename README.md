# Tharnish P. — Portfolio

Personal portfolio built with React, TypeScript, Vite, Framer Motion, Lucide icons, and a small custom CSS design system.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run build` for the strict TypeScript check and production bundle.

## Personalize before publishing

Edit `personal` near the top of `src/App.tsx` to add an email address and a résumé file path (for example `/resume.pdf`). Project case studies are also in that file; replace clearly marked pending details and repository links once verified. The historical DSA count is static and editable. Availability is shown as unspecified.

The hero and project architecture illustrations use SVG/CSS. Scroll reveals use IntersectionObserver and case studies use Framer Motion. GSAP, Three.js/React Three Fiber, Lenis, and Tailwind are omitted: the existing interface uses a custom CSS design system, and those packages would add weight without improving its clarity.
