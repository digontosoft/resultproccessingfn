import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../api';
import Logo from '/logo.png';

const SignUp = () => {
	const [showPass, setShowPass] = useState(false);
	const navigate = useNavigate();

	// const { setAuth } = useAuth();

	const handlePasswordShowHide = () => {
		setShowPass((prev) => !prev);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log({ data });
		try {
			const response = await api.post('/register', { ...data });
			// console.log({ response });

			if (response.status === 200) {
				toast.success('Registered successfully, Sign In now.');
				navigate('/auth/signin');
			}
		} catch (error) {
			console.log(error);
			toast.error(`Error: ${error.response.data.message}`);
		}
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
							<img src="/signin_illustator.svg" alt="signin_illustrator" />
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
								Sign Up to School Dashboard
							</h2>
						</div>

						<form onSubmit={handleSubmit(onSubmit)}>
							{/* First Name and Last Name in a Row */}
							<div className="mb-4 flex gap-4">
								<div className="w-1/2">
									<label className="mb-2.5 block font-medium text-black">
										First Name
									</label>
									<input
										{...register('firstName', {
											required: 'First name is required',
										})}
										type="text"
										placeholder="Enter your first name"
										className={`w-full rounded-lg border ${
											errors.firstName ? 'border-red-500' : 'border-stroke'
										} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
									/>
									{errors.firstName && (
										<p className="mt-1 text-red-500 text-sm">
											{errors.firstName.message}
										</p>
									)}
								</div>

								<div className="w-1/2">
									<label className="mb-2.5 block font-medium text-black">
										Last Name
									</label>
									<input
										{...register('lastName', {
											required: 'Last name is required',
										})}
										type="text"
										placeholder="Enter your last name"
										className={`w-full rounded-lg border ${
											errors.lastName ? 'border-red-500' : 'border-stroke'
										} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
									/>
									{errors.lastName && (
										<p className="mt-1 text-red-500 text-sm">
											{errors.lastName.message}
										</p>
									)}
								</div>
							</div>

							{/* Email */}
							<div className="mb-4">
								<label className="mb-2.5 block font-medium text-black">
									Email
								</label>
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
									} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
								/>
								{errors.email && (
									<p className="mt-1 text-red-500 text-sm">
										{errors.email.message}
									</p>
								)}
							</div>

							{/* Phone Number */}
							<div className="mb-4">
								<label className="mb-2.5 block font-medium text-black">
									Phone Number
								</label>
								<input
									{...register('phoneNumber', {
										required: 'Phone number is required',
										pattern: {
											value: /^[0-9]{11}$/,
											message: 'Enter a valid 11-digit phone number',
										},
									})}
									type="tel"
									placeholder="Enter your phone number"
									className={`w-full rounded-lg border ${
										errors.phoneNumber ? 'border-red-500' : 'border-stroke'
									} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
								/>
								{errors.phoneNumber && (
									<p className="mt-1 text-red-500 text-sm">
										{errors.phoneNumber.message}
									</p>
								)}
							</div>

							{/* Date of Birth */}
							<div className="mb-4">
								<label className="mb-2.5 block font-medium text-black">
									Date of Birth
								</label>
								<input
									{...register('dateOfBirth', {
										required: 'Date of birth is required',
									})}
									type="date"
									className={`w-full rounded-lg border ${
										errors.dateOfBirth ? 'border-red-500' : 'border-stroke'
									} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
								/>
								{errors.dateOfBirth && (
									<p className="mt-1 text-red-500 text-sm">
										{errors.dateOfBirth.message}
									</p>
								)}
							</div>

							{/* Address */}
							<div className="mb-4">
								<label className="mb-2.5 block font-medium text-black">
									Address
								</label>
								<input
									{...register('address', { required: 'Address is required' })}
									type="text"
									placeholder="Enter your address"
									className={`w-full rounded-lg border ${
										errors.address ? 'border-red-500' : 'border-stroke'
									} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
								/>
								{errors.address && (
									<p className="mt-1 text-red-500 text-sm">
										{errors.address.message}
									</p>
								)}
							</div>

							{/* Password */}
							<div className="mb-6">
								<label className="mb-2.5 block font-medium text-black">
									Password
								</label>
								<div className="relative cursor-pointer">
									<input
										{...register('password', {
											required: 'Password is required',
											minLength: {
												value: 6,
												message: 'Password must be at least 6 characters',
											},
										})}
										type={`${!showPass ? 'password' : 'text'}`}
										placeholder="6+ Characters, 1 Capital letter"
										className={`w-full rounded-lg border ${
											errors.password ? 'border-red-500' : 'border-stroke'
										} bg-transparent py-4 pl-6 text-black outline-none focus:border-primary`}
									/>
									<span
										onClick={handlePasswordShowHide}
										className="absolute right-4 top-4"
									>
										<img
											src={`${!showPass ? '/eye-off.svg' : '/eye.svg'}`}
											stroke="1"
										/>
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
									value="Sign Up"
									className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
								/>
							</div>
						</form>

						<div className="mt-6 text-center">
							<p>
								Already have an account?{' '}
								<Link to="/auth/signin" className="text-primary">
									Sign In
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
