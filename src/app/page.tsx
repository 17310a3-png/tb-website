import { getProjects } from '@/lib/projects';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import NumbersStrip from '@/components/NumbersStrip';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Why from '@/components/Why';
import Marquee from '@/components/Marquee';
import Locations from '@/components/Locations';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatCta from '@/components/FloatCta';

// ISR：每 60 秒重新生成，作品集在 Supabase 新增後最多 60 秒內自動上站，無需重部署
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <FloatCta />
      <Nav />
      <Hero />
      <NumbersStrip />
      <About />
      <Services />
      <Process />
      <Portfolio projects={projects} />
      <Why />
      <Marquee />
      <Locations />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
