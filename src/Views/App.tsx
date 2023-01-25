import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from '../Components/html/Navbar'
import Footer from '../Components/html/Footer'
import Body from '../Components/html/Body'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App (): JSX.Element {
  return (<>
    <div className="flex">
      <Router>
        <Navbar />
        <div className='flex flex-col flex-1'>
          <Body />
          <Footer />
        </div>
      </Router>
    </div>
    <ToastContainer className="shadow-lg alert alert-error" />
  </>
  )
}
export default App
