import { useRouter } from 'next/router'
import { useState } from 'react';
import axios from 'axios'
export default function LoginPage() {

	const router = useRouter()
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [errors, setErrors] = useState([]);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	}

	async function handleSubmit(event) {
		event.preventDefault()

		const url = "http://localhost:5002/api";
		const formData = new FormData(event.currentTarget)
		const email = formData.get('email')
		const password = formData.get('password')


		axios.post(url + "/login", { email, password }).then(response => {
			if (response.status === 200) {
				document.cookie = `token=${response.data}`;
				localStorage.setItem('token', response.data.token);
				router.push('/');
			}
		}).catch(error => {
			if (error.response && error.response.data.errors) {

				setErrors(error.response.data.errors.map(err => err.msg));
			} else {
				setErrors([error.message]);
			}
		});
	}


	return (
		<div className="bg-gray-50 font-[sans-seif]">
			<div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
				<div className="max-w-md w-full">

					<div className="p-8 rounded-2xl bg-white shadow">
						<h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
						<form className="mt-8 space-y-4" onSubmit={handleSubmit}>

							{errors.length > 0 && (
								<div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
									<ul>
										{errors.map((error, index) => (
											<li key={index} className="text-sm">{error}</li>
										))}
									</ul>
								</div>
							)}

							<div>
								<label className="text-gray-800 text-sm mb-2 block">Email</label>
								<div className="relative flex items-center">
									<input name="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter email" />
									<span className="material-icons text-gray-400 absolute right-4">
										mail
									</span>
								</div>
							</div>

							<div>
								<label className="text-gray-800 text-sm mb-2 block">Password</label>
								<div className="relative flex items-center">
									<input name="password" type={passwordVisible ? 'text' : 'password'} required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
									<span onClick={togglePasswordVisibility} className="material-icons text-gray-400 absolute right-4 cursor-pointer" >
										{passwordVisible ? 'visibility_off' : 'visibility'}
									</span>
								</div>
							</div>

							<div className="!mt-8">
								<button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
									Sign in
								</button>
							</div>
							<p className="text-gray-800 text-sm !mt-8 text-center">Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);

}