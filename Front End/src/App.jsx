import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompanyView from './components/CompanyView'
import Login from './components/Login'
import Register from './components/Register'
import AddCompany from './components/AddCompany'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<CompanyView/>}/>
      <Route path='/addCompany' element={<AddCompany/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
