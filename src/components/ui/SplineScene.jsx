import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
