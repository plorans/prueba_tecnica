import Image from "next/image";
import { useRouter } from 'next/router'
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from 'react';
import axios from 'axios'

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export default function Home() {
   const [usuarios, setUsuarios] = useState([]);
   const router = useRouter()
   const url = "http://localhost:5002/api";


   const [tableVisible, setTableVisible] = useState(false);
   const userTable = () => {
      setTableVisible(!tableVisible);
   }


   useEffect(() => {

      const fetchUsuarios = async () => {
         try {
            const response = await axios.get(url + '/listaUsuario');
            setUsuarios(response.data);
         } catch (error) {
            console.error('Error al obtener los usuarios:', error);
         }
      };

      fetchUsuarios();
   }, []);

   async function logout() {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
      router.push('/login');
   }


   return (
      <div className={` ${geistSans.variable} ${geistMono.variable} grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black`}>
         <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start text-white">
            <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
            <h1 className="text-2xl font-bold text-center sm:text-left">
               Bienvenido a la Interfaz Principal
            </h1>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
               <button onClick={() => { logout(); }} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" >
                  Log Out
               </button>
            </div>


            <div className=" bottom-1/4 left-1/2 transform bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full sm:w-4/4 z-10">
               <h2 className="text-2xl font-semibold mb-4">Lista de Usuarios</h2>
               <table className="min-w-full table-auto border-collapse border border-gray-600">
                  <thead>
                     <tr className="bg-gray-700">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-200">Nombre</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-200">Password</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-200">Email</th>
                     </tr>
                  </thead>
                  <tbody>
                     {(
                        usuarios.map((usuario) => (
                           <tr key={usuario.id} className="hover:bg-gray-600">
                              <td className="px-4 py-2 text-sm text-gray-200">{usuario.nombre}</td>
                              <td className="px-4 py-2 text-sm text-gray-200">{usuario.password}</td>
                              <td className="px-4 py-2 text-sm text-gray-200">{usuario.email}</td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

         </main>



      </div>


   );
}
