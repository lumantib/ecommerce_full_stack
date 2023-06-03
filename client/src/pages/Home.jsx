//import { Category } from '@mui/icons-material'
import React from 'react'
import Annoucement2 from '../components/Annoucement2'
import Announcement from '../components/Announcement'
import Category from '../components/Category'
import DemoSlider from '../components/DemoSlider'


const Home = () => {

  const onSubmit = (e) => {
    // e.preventDefault();
    localStorage.setItem("mobile", "9840249543")
  }

  return (
    <>
      <DemoSlider />
      <Announcement />
      <Category />
      <Annoucement2 />

      <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="lumanti"
        tabindex="-1"
        aria-labelledby="exampleModalScrollableLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative h-[calc(100%-1rem)] w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
          <div
            class="pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div
              class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

              <h5
                class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200 text-center justify-center"
                id="exampleModalScrollableLabel">
                Log In
              </h5>

              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>


            <form class="relative overflow-y-auto p-4" onSubmit={(e) => onSubmit(e)}>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Mobile Number
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-1000 leading-tight focus:outline-none focus:shadow-outline" id="num" type="number" placeholder="" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="*******" />
              </div>
              <div class=" text-center items-center justify-center shadow appearance-none border rounded w-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <button type='submit'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
