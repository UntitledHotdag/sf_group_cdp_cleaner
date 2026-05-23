import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ImportWizard } from './pages/ImportWizard'
import { TagsGuide } from './pages/TagsGuide'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide/tags" element={<TagsGuide />} />
        <Route path="/import/:sheetId" element={<ImportWizard />} />
        <Route path="/import/users" element={<Navigate to="/import/member_list" replace />} />
        <Route path="/import/purchases" element={<Navigate to="/import/orders" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
