import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Hero   from './components/sections/Hero';

const About    = lazy(() => import('./components/sections/About'));
const Services = lazy(() => import('./components/sections/Services'));
const Stack    = lazy(() => import('./components/sections/Stack'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact  = lazy(() => import('./components/sections/Contact'));
const Footer   = lazy(() => import('./components/layout/Footer'));

const Placeholder = () => <div className="py-28" aria-hidden="true" />;

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<Placeholder />}>
          <About />
          <Services />
          <Stack />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}
