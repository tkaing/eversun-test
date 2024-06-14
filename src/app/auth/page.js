'use client';

import { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AppModal from '../components/AppModal';
import FormGroup from '../components/FormGroup';
import { useApp } from '@/contexts/AppContext';
import { button } from '@/styles/placeholders/button';
import useFormValidation from '@/hooks/useFormValidation';
import AuthClient, { JWT_ID } from '@/app/clients/AuthClient';
import { colors, fontWeight } from '@/styles/settings/variables';
import { fieldError, whiteField } from '@/styles/placeholders/field';
import { loginSchema, registerSchema } from './schemas';
import { A, Button, Div, Input, Span } from '../components/base';

const styles = {
	code: css`
		color: ${colors.primary};
		font-weight: ${fontWeight.bold};
	`,
	text: css`
		color: ${colors.primary};
	`,
	toggleMode: css`
		color: ${colors.primary};
	`,
};

const initialLoginForm = {
	code: '',
	username: '',
};

const initialRegisterForm = {
	name: '',
	email: '',
};

export default function Auth() {
	const router = useRouter();

	const [form, setForm] = useState(initialLoginForm);

	const [isLogging, setIsLogging] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);

	const [genericError, setGenericError] = useState(null);
	const [isSignInMode, setIsSignInMode] = useState(true);
	const [accountRegistered, setAccountRegistered] = useState(null);

	const {
		actions: { setUser },
	} = useApp();

	const { errors, handleSubmit, resetValidation } = useFormValidation({
		form: form,
		schema: isSignInMode ? loginSchema : registerSchema,
	});

	const handleSave = () => {
		resetValidation();
		setGenericError(null);

		if (isSignInMode) {
			setIsLogging(true);

			AuthClient.signIn(form)
				.then(res => {
					if (res.status === 404) {
						throw 'user not found';
					}

					if (res.status === 403) {
						throw 'bad password';
					}

					if (res.status !== 200) {
						throw 'unknown error';
					}

					setForm(initialLoginForm);

					localStorage.setItem(JWT_ID, res.data.token);

					return AuthClient.fetchUserInfo();
				})
				.then(res => {
					if (res.status !== 200) {
						throw 'cannot fetch user info';
					}

					setUser(res.data);

					router.replace(`/`);
				})
				.catch(reason => {
					setGenericError(reason);
				})
				.finally(() => {
					setIsLogging(false);
				});
		} else {
			setIsRegistering(true);

			AuthClient.signUp(form)
				.then(res => {
					setAccountRegistered({ pseudo: form.name, code: res.data.code });
					setForm(initialRegisterForm);
				})
				.catch(reason => {
					setGenericError(reason);
				})
				.finally(() => {
					setIsRegistering(false);
				});
		}
	};

	const handleTextChange = ({ target: { name, value } }) => {
		setForm(prev => ({ ...prev, [name]: value }));
		setGenericError(null);
	};

	useEffect(() => {
		setForm(isSignInMode ? initialLoginForm : initialRegisterForm);
	}, [isSignInMode]);

	return (
		<Div>
			<AppModal open={!accountRegistered} heading={isSignInMode ? `Se connecter` : `S'inscrire`} preventClose>
				<Div>
					{/* Login Form */}
					{isSignInMode && (
						<Div>
							<FormGroup
								error={errors.username}
								labelText="Pseudo / Email*"
								labelProps={{ className: 'mb-2' }}
							>
								<br />
								<Input
									sx={whiteField}
									type="text"
									name="username"
									value={form.username}
									onChange={handleTextChange}
								/>
							</FormGroup>
							<FormGroup
								error={errors.code}
								labelText="Code*"
								className="mt-2"
								labelProps={{ className: 'mb-2' }}
							>
								<br />
								<Input
									sx={whiteField}
									type="text"
									name="code"
									maxLength={4}
									value={form.code}
									onChange={handleTextChange}
								/>
							</FormGroup>
						</Div>
					)}

					{/* Register Form */}
					{!isSignInMode && (
						<Div>
							<FormGroup error={errors.name} labelText="Pseudo*" labelProps={{ className: 'mb-2' }}>
								<br />
								<Input
									sx={whiteField}
									type="text"
									name="name"
									value={form.name}
									onChange={handleTextChange}
								/>
							</FormGroup>
							<FormGroup
								error={errors.email}
								labelText="Email*"
								className="mt-2"
								labelProps={{ className: 'mb-2' }}
							>
								<br />
								<Input
									sx={whiteField}
									type="text"
									name="email"
									value={form.email}
									onChange={handleTextChange}
								/>
							</FormGroup>
						</Div>
					)}

					{genericError && (
						<Div sx={fieldError} className="mt-4">
							{AuthClient.getErrorMapping(genericError)}
						</Div>
					)}

					<Button
						sx={button}
						className="mt-4"
						onClick={() => handleSubmit(handleSave)}
						disabled={isLogging || isRegistering}
					>
						{isSignInMode ? 'Se connecter' : "S'inscrire"}
					</Button>

					<Div className="mt-5" sx={styles.toggleMode}>
						{isSignInMode ? "Vous n'avez pas de compte" : 'Vous avez déjà un compte'} ?{' '}
						<A
							href="#"
							onClick={() => {
								setIsSignInMode(prev => !prev);
								resetValidation();
							}}
						>
							{isSignInMode ? "S'inscrire" : 'Se connecter'}
						</A>
					</Div>
				</Div>
			</AppModal>

			<AppModal open={!!accountRegistered} heading="Ton compte a bien été enregistré !" preventClose>
				<Div sx={styles.text}>
					Ton pseudo : <Span sx={styles.code}>{accountRegistered?.pseudo}</Span>
				</Div>
				<Div sx={styles.text}>
					Ton code : <Span sx={styles.code}>{accountRegistered?.code}</Span>
				</Div>

				<Div sx={styles.text}>Conserve bien ce pseudo et ce code dans tes notes !</Div>

				<Button
					sx={button}
					className="mt-4"
					onClick={() => {
						setIsSignInMode(true);
						setAccountRegistered(null);
					}}
				>
					Se connecter
				</Button>
			</AppModal>
		</Div>
	);
}
