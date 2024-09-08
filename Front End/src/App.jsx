import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompanyView from './components/CompanyView'
import Login from './components/Login'
import Register from './components/Register'
import AddCompany from './components/AddCompany'
import HrDashboard from './components/HrDashboard'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin' element={<CompanyView/>}/>
      <Route path='/addCompany' element={<AddCompany/>}/>
      <Route path='/hr' element={<HrDashboard/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
