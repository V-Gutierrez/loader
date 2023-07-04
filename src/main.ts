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


const newLoader = new Loader(dataToBeLoaded);


const loaderFunc = async (url: string) => {
  const response = await fetch(url);

  const data = await response.json();
  return data;
}

newLoader.loaderFunction = loaderFunc

async function testLoader() {
  await newLoader.load<{ name: string, url: string }>("url");
  console.log(newLoader.data)
}

testLoader();