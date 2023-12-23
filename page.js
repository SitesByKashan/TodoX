"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todos, settodos] = useState({ title: "", desc: "" })
  const [currentTodos, setCurrentTodos] = useState([])
  const [help, setHelp] = useState("Help from OpenAI will appear here")

  useEffect(() => {
    const getData = async () => {
      let a = await fetch("/api")
      let b = await a.json()
      console.log(b.rows)
      setCurrentTodos(b.rows)
    }
    getData()
  }, [])

  const handleChange = (e) => {
    settodos({ ...todos, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    let a = await fetch("/api", {
      body: JSON.stringify(todos),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    let response = await a.json()
    console.log(response)
    settodos({ title: "", desc: "" })
  }

  const getHelp = async (todo) => {
    setHelp("Loading...")
    let a = await fetch("/api/open", {
      body: JSON.stringify({ todo: todo }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    let response = await a.json()
    setHelp(response.text)
  }
  return (
    <div>
      <header className="text-gray-200 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src={"logo.svg"} width={40} height={100} />
            <span className="ml-3 text-xl text-gray-200">TodoX</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-blue-600">Home</a>
            <a className="mr-5 hover:text-blue-600">About</a>

          </nav>

        </div>
      </header>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12
 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add a  Todo</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Helps you add a Todo. Add your Todo Now..</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">

              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="title" className="leading-7 text-sm text-gray-600">Todo Title</label>
                  <input onChange={handleChange} type="text" id="title" value={todos.title} name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Todo Description</label>
                  <textarea onChange={handleChange} id="desc" name="desc" value={todos.desc} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={handleSubmit} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Todo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-300 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Your TodoX</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-white text-lg bg-gray-800 rounded-tl rounded-bl">Title</th>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-white text-lg bg-gray-800">Description</th>
                  <th className="px-4 py-3 title-font tracking-wider font-bold text-white text-lg bg-gray-800">Help From OpenAI</th>

                </tr>
              </thead>
              {currentTodos.map((item) => {
                return <tbody>
                  <tr>
                    <td className="px-4 py-3">{item[0]}</td>
                    <td className="px-4 py-3">{item[1]}</td>
                    <td className="px-4 py-3"> <button onClick={() => { getHelp(item[0]) }} className="mx-4 my-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get AI</button></td>
                  </tr>

                </tbody>
              })}
            </table>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Help From OpenAI</h1>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-full w-full">
              <div className="h-full bg-gray-200 text-gray-900 p-8 rounded">

                <p className="leading-relaxed mb-6">{help}</p>
                <a className="inline-flex items-center">

                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900 font-bold">SITES BY KASHAN</span>
                    <span className="text-gray-500 text-sm">FULL STACK DEVELOPER</span>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a href='/index' class="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <Image src={"logo.svg"} width={70} height={100} />
            <span class="ml-3 text-xl">TodoX</span>
          </a>
          <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 TodoX —
            <a href="https://sitesbykashan.netlify.app/" class="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">Sites By Kashan</a>
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href='https://www.facebook.com/kashanmalik.kashanmalik.9' class="text-gray-400">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
           
            <a href='https://www.instagram.com/sites_by_kashan/' class="ml-3 text-gray-400">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href='https://www.linkedin.com/in/kashan-malik-47374422a/' class="ml-3 text-gray-400">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
