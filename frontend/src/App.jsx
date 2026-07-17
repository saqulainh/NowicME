import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import Analytics from './components/Analytics';
import MainLayout from './layouts/MainLayout';
import NotFound, { AdminNotFound } from './pages/NotFound';

/* Admin */
import AdminLayout from './layouts/AdminLayout';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));
const ClientDashboard = lazy(() => import('./pages/Dashboard'));
const SubmitReview = lazy(() => import('./pages/SubmitReview'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const LeadsManagement = lazy(() => import('./pages/admin/LeadsManagement'));
const ProjectsManagement = lazy(() => import('./pages/admin/ProjectsManagement'));
const UsersManagement = lazy(() => import('./pages/admin/UsersManagement'));
const InvoicesManagement = lazy(() => import('./pages/admin/InvoicesManagement'));
const BrandEditor = lazy(() => import('./pages/admin/BrandEditor'));
const ServicesEditor = lazy(() => import('./pages/admin/ServicesEditor'));
const PortfolioEditor = lazy(() => import('./pages/admin/PortfolioEditor'));
const StatsEditor = lazy(() => import('./pages/admin/StatsEditor'));
const AboutEditor = lazy(() => import('./pages/admin/AboutEditor'));
const FAQEditor = lazy(() => import('./pages/admin/FAQEditor'));
const ReviewsManagement = lazy(() => import('./pages/admin/ReviewsManagement'));
const BlogManagement = lazy(() => import('./pages/admin/BlogManagement'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Analytics />
      {!isAdmin && <SmoothScroll />}
      <Suspense fallback={<div className="min-h-screen bg-[#050806]" />}>
        <Routes>
          {/* Public site */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/review" element={<SubmitReview />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin CMS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<LeadsManagement />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="invoices" element={<InvoicesManagement />} />
            <Route path="reviews" element={<ReviewsManagement />} />
            <Route path="brand" element={<BrandEditor />} />
            <Route path="services" element={<ServicesEditor />} />
            <Route path="portfolio" element={<PortfolioEditor />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="blog/new" element={<BlogEditor />} />
            <Route path="blog/edit/:id" element={<BlogEditor />} />
            <Route path="stats" element={<StatsEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="faqs" element={<FAQEditor />} />
            <Route path="*" element={<AdminNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
