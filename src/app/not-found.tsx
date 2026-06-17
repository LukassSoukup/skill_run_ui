import Link from 'next/link';
import CommonLayout from './components/Layout';
import { navMap } from './interfaces/NavMapInt';

const NotFoundPage = () => {
  return (
    <CommonLayout pageName={navMap.home}>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold">Page Not Found</p>
        <p className="text-base-content/60 max-w-sm">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link className="btn btn-primary" href="/">
          Go back to Home
        </Link>
      </div>
    </CommonLayout>
  );
};

export default NotFoundPage;
