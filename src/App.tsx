import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Post, { PostProps } from './components/Post';

import style from './App.module.css';
import './global.css';

interface Post extends PostProps {
  id: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/Emanuel-Boaventura.png',
      name: 'Emanuel Boaventura',
      role: 'Trainee DomPixel',
    },
    content: [
      { contentType: 'paragraph', content: 'Fala galeraa 👋' },
      {
        contentType: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { contentType: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-11-15 14:26:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/SirFaria.png',
      name: 'Mateus Faria',
      role: 'Dev Junior DomPixel',
    },
    content: [
      { contentType: 'paragraph', content: 'Fala galeraa 👋' },
      {
        contentType: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { contentType: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-11-22 14:26:30'),
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
