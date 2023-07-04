import { LoaderData, RawData } from "./types";

export class Loader<T> {
  private readonly _data: LoaderData<T>[];
  public loader: Function | null = null;

  constructor(data: T[]) {
    this._data = this.transformInputDataIntoLoaderData(data);
  }

  /**
   * The function transforms an array of input data into an array of loader data objects.
   * @param {T[]} data - An array of items of type T.
   * @returns an array of objects of type `LoaderData<T>`.
   */
  private transformInputDataIntoLoaderData(data: T[]): LoaderData<T>[] {
    return data.map((item) => {
      return {
        loadedData: null,
        rawData: item as RawData<T>,
        metadata: {
          shouldLoad: false,
          isLoaded: false
        }
      }
    })
  }

  /**
   * The function returns the data stored in the LoaderData array.
   * @returns The `data` property is being returned.
   */
  public get data(): LoaderData<T>[] {
    return this._data;
  }

  public set loaderFunction(loader: Function) {
    this.loader = loader;
  }
}