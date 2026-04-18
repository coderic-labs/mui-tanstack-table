/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MTT_ENABLE_TEST_ATTRS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
