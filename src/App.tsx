import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TrainingPage } from './pages/TrainingPage';
import { CoachesPage } from './pages/CoachesPage';
import { FounderPage } from './pages/FounderPage';
import { SchedulePage } from './pages/SchedulePage';
import { ApplyPage } from './pages/ApplyPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ApplicationsListPage } from './pages/admin/ApplicationsListPage';
import { ApplicationDetailPage } from './pages/admin/ApplicationDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Experience */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/coaches" element={<CoachesPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Console */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="applications" element={<ApplicationsListPage />} />
          <Route path="applications/:id" element={<ApplicationDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
