import Navbare from "@/Components/html/Navbar"
import Sidebar from "@/Components/html/Sidebar"

export default function Home() {
  return (
    <>
     
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <div className='flex'>
    <Sidebar />
    <div className='flex flex-col flex-1'>
        <Navbare />
        {page}
    </div>
  </div>
  )
}
