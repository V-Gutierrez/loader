interface LoaderData<T> {
  loadedData: T | null;
  rawData: RawData<T>;
  metadata: LoaderMetadata
}

interface LoaderMetadata {
  shouldLoad: boolean;
  isLoaded: boolean;
}

interface RawData<K> {
  data: K | any;
}