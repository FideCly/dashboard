import Navbar from "@/Components/html/Navbar"

export default function Home() {
  return (
    <>
     
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <>
      <Navbar />
      {page}
    </>
  )
}
