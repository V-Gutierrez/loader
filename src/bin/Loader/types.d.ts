export interface LoaderData<T> {
  loadedData: T | null;
  rawData: RawData<T>;
  metadata: LoaderMetadata
}

export interface LoaderMetadata {
  shouldLoad: boolean;
  isLoaded: boolean;
}

export interface RawData<K> {
  data: K | any;
}

export type LoaderFunction<T> = ((data: RawData<T>) => Promise<T>) | null
