import Link from 'next/link';
import ThreeCanvas from './components/canvas/ThreeCanvas';
import CommonLayout from './components/Layout';
import { navMap } from './interfaces/NavMapInt';
const NotFoundPage = () => {
  return (
    <CommonLayout pageName={navMap.home}>
      <div className="fixed inset-0">
        <ThreeCanvas />
      </div>
      <div className="relative z-5 flex flex-col items-center justify-center min-h-screen dark:invert">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <Link className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600' href="/">
          Go back to Home
        </Link>
      </div>
    </CommonLayout>
  );
};

export default NotFoundPage;