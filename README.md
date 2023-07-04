# 1.0.0 - First Release

### Example:
```ts 

import { Loader } from "./bin/Loader"

const dataToBeLoaded = [
  {
    name: 'users',
    url: 'https://jsonplaceholder.typicode.com/users'
  },
  {
    name: 'posts',
    url: 'https://jsonplaceholder.typicode.com/posts'
  },
  {
    name: 'comments',
    url: 'https://jsonplaceholder.typicode.com/comments'
  }
]

const loaderFunc = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const newLoader = new Loader(dataToBeLoaded, loaderFunc);


async function testLoader() {
  await newLoader.load<{ name: string, url: string }>("url", 2);
  console.log(newLoader.data)
}

testLoader();

```