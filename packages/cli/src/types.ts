export interface BlinkConfig {
  registry: string;
  framework: Framework;
  componentDir: string;
  prefix: string;
  installedComponents: string[];
}

export type Framework = 'vanilla' | 'react' | 'vue' | 'svelte' | 'solid';

export interface RegistryIndex {
  version: string;
  components: RegistryComponentMeta[];
}

export interface RegistryComponentMeta {
  name: string;
  description: string;
  tag: string;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
}

export interface RegistryComponent {
  name: string;
  tag: string;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
  files: RegistryFile[];
}

export interface RegistryFile {
  path: string;
  content: string;
}

export interface RegistryTokens {
  name: string;
  files: RegistryFile[];
}
