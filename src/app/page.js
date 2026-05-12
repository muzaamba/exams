import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedSubjects from '@/components/home/FeaturedSubjects';
import PopularQuizzes from '@/components/home/PopularQuizzes';
import StatsSection from '@/components/home/StatsSection';
import LeaderboardPreview from '@/components/home/LeaderboardPreview';
import AdBanner from '@/components/ads/AdBanner';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AdBanner slot="home_top" />
        <FeaturedSubjects />
        <PopularQuizzes />
        <AdBanner slot="home_middle" />
        <StatsSection />
        <LeaderboardPreview />
      </main>
      <Footer />
    </>
  );
}
