// src/types/images.d.ts
declare module "*.png" {
  const png: string;
  export default png;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const svg: string;
  export default svg;
}

