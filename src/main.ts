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

newLoader.data.forEach((item) => {
  console.log(item);
})

const loaderFunc = async (url: string) => {
  const response = await fetch(url);

  const data = await response.json();
  return data;
}


newLoader.loaderFunction = loaderFunc