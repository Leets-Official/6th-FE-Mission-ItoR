/// <reference types="vite/client" />

declare const ENABLE_PLAYGROUND: string;

declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PLAYGROUND: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
