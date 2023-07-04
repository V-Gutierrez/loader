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