import { Route, Routes } from 'react-router'
import Mailing from '../../Views/Client/Mailing'
import Promotion from '../../Views/Client/Promotion'
import Scanner from '../../Views/Client/Scanner'
import Dashboard from '../../Views/Home/Dashboard'
import GeneralSettings from '../../Views/Settings/GeneralSettings'
import Signup from '../../Views/Auth/Signup'

export default function Body (): JSX.Element {
  return (
    <div className="min-h-screen body">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mailing" element={<Mailing />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/settings" element={<GeneralSettings />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}
