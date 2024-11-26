import {useEffect, useState } from "react";
import Footer from "./components/Footer"
import Main from "./components/main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  function handleToggleModal(){
    setShowModal(!showModal);
  }

  useEffect(()=>{
    async function fetchAPIData(){
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchAPIData()
  }, [])

  const today = (new Date()).toDateString()
  const localKey = `NASA-${today}`
  if (localStorage.getItem(localKey)){
    const apiData = JSON.parse(localStorage.getItem(localKey))
    setData(apiData)
    console.log('Fetched from cache today')
    return
  }
  localStorage.clear()
  return (
    <>
      {data ? (<Main data={data} />): (
        <div className="loadingState">
          <i className="fa-duotone fa-solid fa-spinner"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal}/>
        )}
     {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}

</>
  )
}

export default App
