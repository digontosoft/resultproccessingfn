import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../api';
import useAuth from '../../hooks/useAuth';
import Logo from '/logo.png';

const SignIn = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await api.post('/login', { ...data });

			if (response.status === 202) {
				toast.success('User with given email is not registered yet.', {
					autoClose: 2500,
				});
			}

			if (response.status === 200) {
				toast.success('Sign In successfully');
				localStorage.setItem('auth', JSON.stringify({ ...response.data }));
				setAuth({ ...response.data });
				navigate('/');
			}
		} catch (error) {
			console.log(error);
			toast.error(`Error: ${error.response.data.message}`);
		}

		// const token = crypto.randomUUID().toString();
		// const userType = 'admin';
		// const authData = {
		// 	...data,
		// 	token,
		// 	userType,
		// };

		// console.log(authData);
		// localStorage.setItem('auth', JSON.stringify(authData));
		// setAuth({ ...authData });
		// navigate('/');
	};

	return (
		<div className="">
			<div className="flex flex-wrap items-center">
				<div className="hidden w-full xl:block xl:w-1/2">
					<div className="py-17.5 px-26 text-center">
						<Link className="mb-5.5 inline-block" to="/">
							<img src={Logo} alt="Logo" className="invert" />
						</Link>

						<span className="mt-15 inline-block">
							<img src="/signin_illustator.svg" alt="signin_illustator" />
						</span>
					</div>
				</div>

				<div className="w-full border-stroke xl:w-1/2 xl:border-l-2">
					<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
						<div className="flex flex-col justify-center items-center">
							<Link className="mb-5.5 inline-block xl:hidden" to="/">
								<img src={Logo} alt="Logo" className="invert" />
							</Link>

							<h2 className="mb-9 text-2xl font-bold text-black">
								Sign In to School Dashboard
							</h2>
						</div>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<label className="mb-2.5 block font-medium text-black">
									Email
								</label>
								<div className="relative">
									<input
										{...register('email', {
											required: 'Email is required',
											pattern: {
												value:
													/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
												message: 'Enter a valid email address',
											},
										})}
										type="email"
										placeholder="Enter your email"
										className={`w-full rounded-lg border ${
											errors.email ? 'border-red-500' : 'border-stroke'
										} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary`}
									/>
									<span className="absolute right-4 top-4">
										<img src="/mail.svg" stroke={1.25} />
									</span>
								</div>
								{errors.email && (
									<p className="mt-1 text-red-500 text-sm">
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="mb-6">
								<label className="mb-2.5 block font-medium text-black">
									Password
								</label>
								<div className="relative">
									<input
										{...register('password', {
											required: 'Password is required',
											minLength: {
												value: 6,
												message: 'Password must be at least 6 characters',
											},
										})}
										type="password"
										placeholder="6+ Characters, 1 Capital letter"
										className={`w-full rounded-lg border ${
											errors.password ? 'border-red-500' : 'border-stroke'
										} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary`}
									/>
									<span className="absolute right-4 top-4">
										<img src="/lock.svg" stroke="1" />
									</span>
								</div>
								{errors.password && (
									<p className="mt-1 text-red-500 text-sm">
										{errors.password.message}
									</p>
								)}
							</div>

							<div className="mb-5">
								<input
									type="submit"
									value="Sign In"
									className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
								/>
							</div>
						</form>

						{/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50">
							<span>
								<img src="/brand-google.svg" stroke={1.25} />
							</span>
							Sign in with Google
						</button> */}

						<div className="mt-6 text-center">
							<p>
								Don’t have any account?{' '}
								<Link to="/auth/signup" className="text-primary">
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
