import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ServicePage } from './pages/ServicePage'
import { NotFound } from './pages/NotFound'
import { ScrollManager } from './components/ScrollManager'
import { SiteFooter } from './components/SiteFooter'

export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/:slug" element={<CaseStudyPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
