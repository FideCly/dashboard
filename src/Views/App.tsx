import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from '../Components/html/Navbar'
import Footer from '../Components/html/Footer'
import Body from '../Components/html/Body'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App (): JSX.Element {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Body />
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  )
}
export default App
