import { CandidateDrawer } from './components/CandidateDrawer';
import { LandingHero } from './components/landing/LandingHero';
import { LeadForm } from './components/landing/LeadForm';
import { ProductSections } from './components/landing/ProductSections';
import { SiteFooter } from './components/landing/SiteFooter';
import { TopNav } from './components/landing/TopNav';
import { RecruitingDemoPanel } from './components/RecruitingDemoPanel';

export default function App() {
  return (
    <div className="relative flex min-h-full flex-col overflow-x-clip bg-[#090b10]">
      <TopNav />
      <LandingHero />
      <ProductSections />
      <RecruitingDemoPanel />
      <LeadForm />
      <SiteFooter />
      <CandidateDrawer />
    </div>
  );
}
