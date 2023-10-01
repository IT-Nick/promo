import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./HomeComponent'), {
  ssr: false
});

export default Home;
