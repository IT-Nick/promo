import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./HomeApp'), {
  ssr: false
});

export default Home;
