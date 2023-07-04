import { Loader } from "./index";

describe("Loader", () => {
  const mockData = [1, 2, 3];
  const mockLoader = jest.fn((data: number) => Promise.resolve(data * 2));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should transform input data into loader data objects", () => {
    const loader = new Loader(mockData);

    expect(loader.data).toHaveLength(mockData.length);

    loader.data.forEach((item, index) => {
      expect(item.loadedData).toBeNull();
      expect(item.rawData.data).toBe(mockData[index]);
      expect(item.metadata._id).toBeDefined();
      expect(item.metadata.shouldLoad).toBe(index === 0);
      expect(item.metadata.isLoaded).toBe(false);
    });
  });

  it("should set the loader function", () => {
    const loader = new Loader(mockData);

    expect(loader.loader).toBeNull();

    loader.loaderFunction = mockLoader;

    expect(loader.loader).toBe(mockLoader);
  });

  it("should throw an error if loader function is not defined", async () => {
    const loader = new Loader(mockData);

    await expect(loader.load("data")).rejects.toThrow("Loader function is not defined");
  });

  it("should load data and update items", async () => {
    const loader = new Loader(mockData);
    loader.loaderFunction = mockLoader;

    await loader.load("data");
    await loader.load("data");
    await loader.load("data");

    expect(mockLoader).toHaveBeenCalledTimes(mockData.length);

    loader.data.forEach((item) => {
      expect(item.loadedData).toBeDefined();
      expect(item.metadata.isLoaded).toBe(true);
      expect(item.metadata.shouldLoad).toBe(false);
    });
  });
});