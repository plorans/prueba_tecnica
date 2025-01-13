import { useRouter } from 'next/router'
import axios from 'axios'
export default function RegisterPage() {

    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()

        console.log("Submit");

        const url = "http://localhost:5002/api";
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const nombre = formData.get('nombre')
        const password = formData.get('password')


        axios.post(url + "/save", { email, password , nombre}).then(response => {
            if (response.status === 200) {
                router.push('/login');
            }
        }).catch(error => {
            if (error.response && error.response.data.errors) {
                // Accede a los mensajes de error
                error.response.data.errors.forEach(err => {
                    console.log(err);  // Imprime el mensaje de cada error
                });
            } else {
                // Si no hay errores en la respuesta, imprime el error general
                console.log(error.message);
            }
        });
    }

    return (
        <div className="bg-gray-50 font-[sans-seif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input name="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter email" />
                                    <span className="material-icons text-gray-400 absolute right-4">
                                        mail
                                    </span>
                                </div>
                            </div>

                            {/* Campo de usuario */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Nombre</label>
                                <div className="relative flex items-center">
                                    <input name="nombre" type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter username" />
                                    <span className="material-icons text-gray-400 absolute right-4">
                                        person
                                    </span>
                                </div>
                            </div>

                            {/* Campo de contraseña */}
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                <div className="relative flex items-center">
                                    <input name="password" type="password" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                                    <span className="material-icons text-gray-400 absolute right-4 cursor-pointer">
                                        lock
                                    </span>
                                </div>
                            </div>

                            {/* Botón de enviar */}
                            <div className="!mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" >
                                    Register
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold" >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}