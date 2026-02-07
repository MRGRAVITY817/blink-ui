import type {
  RegistryIndex,
  RegistryComponent,
  RegistryTokens,
} from '../types.js';

const DEFAULT_REGISTRY =
  'https://raw.githubusercontent.com/MRGRAVITY817/blink-ui/main/registry';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchIndex(registryUrl?: string): Promise<RegistryIndex> {
  const base = registryUrl ?? DEFAULT_REGISTRY;
  return fetchJson<RegistryIndex>(`${base}/index.json`);
}

export async function fetchComponent(
  name: string,
  registryUrl?: string,
): Promise<RegistryComponent> {
  const base = registryUrl ?? DEFAULT_REGISTRY;
  return fetchJson<RegistryComponent>(`${base}/components/${name}.json`);
}

export async function fetchTokens(
  registryUrl?: string,
): Promise<RegistryTokens> {
  const base = registryUrl ?? DEFAULT_REGISTRY;
  return fetchJson<RegistryTokens>(`${base}/styles/tokens.json`);
}
