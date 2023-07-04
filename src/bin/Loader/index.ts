export class Loader<T> {
  private readonly _data: LoaderData<T>[];

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
   * The function returns an array of LoaderData objects.
   * @returns The `seeData` method is returning an array of `LoaderData` objects.
   */
  public get seeData(): LoaderData<T>[] {
    return this._data;
  }
}