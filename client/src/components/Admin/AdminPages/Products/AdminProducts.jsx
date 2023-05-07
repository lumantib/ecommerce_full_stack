import React from 'react'

const AdminProducts = () => {
    return (
        <div class="w-full ">
            <div className='flex w-full justify-center items-center h-full py-8'>
                <form action="" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[500px]">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="pname">
                            Product Name:
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pname" type="text" 
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Product Detail:
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pdetail" type="text" 
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
                            Product Price:
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Rs"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                            Image
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" 
                        />
                    </div>
                    <div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                           Submit:
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminProducts