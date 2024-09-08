import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompanyView from './components/CompanyView'
import Login from './components/Login'
import Register from './components/Register'
import AddCompany from './components/AddCompany'
import HrDashboard from './components/HrDashboard'
import AddEmployee from './components/AddEmployee'
import ManagerDashboard from './components/ManagerDashboard'
import EmployeeProfile from './components/EmployeeProfile'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin' element={<CompanyView/>}/>
      <Route path='/addCompany' element={<AddCompany/>}/>
      <Route path='/hr' element={<HrDashboard/>}/>
      <Route path='/addEmployee' element={<AddEmployee/>}/>
      <Route path='/manager' element={<ManagerDashboard/>}/>
      <Route path='/employee' element={<EmployeeProfile/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
