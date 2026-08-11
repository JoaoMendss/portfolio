import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Stack from './components/sections/Stack';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

const Fade = ({ from, to }) => (
  <div className={`h-16 bg-gradient-to-b ${from} ${to}`} aria-hidden="true" />
);

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Fade from="from-zinc-50 dark:from-zinc-900" to="to-white dark:to-zinc-950" />
        <Services />
        <Fade from="from-white dark:from-zinc-950" to="to-zinc-50 dark:to-zinc-900" />
        <Stack />
        <Fade from="from-zinc-50 dark:from-zinc-900" to="to-white dark:to-zinc-950" />
        <Projects />
        <Fade from="from-white dark:from-zinc-950" to="to-zinc-50 dark:to-zinc-900" />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
