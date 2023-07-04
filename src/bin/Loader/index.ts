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
    return data.map((item, index) => {
      return {
        loadedData: null,
        rawData: { data: item as RawData<T> },
        metadata: {
          _id: crypto.randomUUID(),
          shouldLoad: index === 0 ? true : false,
          isLoaded: false,
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

  /**
   * The function sets the loader function for a TypeScript class.
   * @param {Function} loader - The `loader` parameter is a function that will be used to load data or
   * perform any other necessary operations.
   */
  public set loaderFunction(loader: Function) {
    this.loader = loader;
  }

  /**
   * The `load` function asynchronously loads data based on a specified key from the `rawData` property
   * of each item in the `data` array, using a loader function, and updates the corresponding item with
   * the loaded value.
   * @param rawDataKey - The `rawDataKey` parameter is a keyof `RawData<T>`, which means it should be a
   * valid key of the `RawData<T>` type. The `RawData<T>` type is not provided in the code snippet, so
   * I cannot determine the exact keys available. However, you
   */
  public async load<T>(rawDataKey: keyof T) {
    if (this.loader === null) {
      throw new Error("Loader function is not defined");
    }

    const dataToLoad = this.data.filter((item) => item.metadata.shouldLoad);

    const promises = dataToLoad.map((item) => {
      return this.loader!(item.rawData.data[rawDataKey]);
    })

    await Promise.all(promises).then((values) => {
      values.forEach((value, index) => {
        this.updateItemAfterLoading(dataToLoad[index].metadata._id, value);
      })
    })
  }

  /**
   * The function updates an item in an array after it has been loaded with new data.
   * @param {string} _id - The _id parameter is a string that represents the unique identifier of the
   * item you want to update.
   * @param {T} newData - The `newData` parameter is the updated data that you want to assign to the
   * `loadedData` property of the item with the specified `_id`.
   */
  private updateItemAfterLoading(_id: string, newData: T) {
    const itemIndex = this._data.findIndex((item) => item.metadata._id === _id);

    this._data[itemIndex].metadata.isLoaded = true;
    this._data[itemIndex].metadata.shouldLoad = false;
    this._data[itemIndex].loadedData = newData

    if (this._data[itemIndex + 1]) {
      this._data[itemIndex + 1].metadata.shouldLoad = true;
    }
  }
}