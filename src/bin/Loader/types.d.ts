export interface LoaderData<T> {
  loadedData: T | null;
  rawData: RawData<T>;
  metadata: LoaderMetadata
}

export interface LoaderMetadata {
  shouldLoad: boolean;
  isLoaded: boolean;
  _id: string;
}

export interface RawData<K> {
  data: K | any;
}
