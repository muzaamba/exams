import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedSubjects from '@/components/home/FeaturedSubjects';
import PopularQuizzes from '@/components/home/PopularQuizzes';
import StatsSection from '@/components/home/StatsSection';
import LeaderboardPreview from '@/components/home/LeaderboardPreview';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedSubjects />
        <PopularQuizzes />
        <StatsSection />
        <LeaderboardPreview />
      </main>
      <Footer />
    </>
  );
}
