//Imports hook-form
import { useForm } from "react-hook-form";

//Imports Chakra UI
import {
	Button,
	VStack,
	Heading,
	Input,
	FormControl,
	FormLabel,
	Text,
	useToast,
	Flex,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

//Imports AuthContext
import { useContext, useState } from "react";
import AuthContext from "../context/authContext";

// Imports react-router-dom to navigate between pages
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();
	const { login } = useContext(AuthContext);
	const password = watch("password");
	const toast = useToast();
	const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

	const onSubmit = (data) => {
		login(data);
		reset();
		toast({
			title: "Usuário cadastrado com sucesso",
			description: "Você será redirecionado para a página de Login",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
		setTimeout(() => {
			navigate("/login");
		}, 5000);
	};

	const handleClick = () => setShow(!show);
  const handleConfirmClick = () => setShowConfirm(!showConfirm);

	return (
		<Flex maxW="2xl" mx="auto" direction="column" align="center">
			<Heading
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				bgClip="text"
				fontSize={{ base: "2xl", md: "4xl" }}
				textAlign="center"
				my={10}>
				ALLOWANCE
			</Heading>

			<VStack
				as="form"
				onSubmit={handleSubmit(onSubmit)}
				align="center"
				w={{ base: "80%", md: "50%", xl: "50%" }}
				mx="auto">
				<FormControl mb={1} isInvalid={errors.name}>
					<FormLabel ms={2} mb={0}>
						Name
					</FormLabel>
					<Input
						type="text"
						placeholder="Digite seu nome"
						{...register("name", {
							// required: "O nome é obrigatório",
							minLength: {
								value: 3,
								message: "O nome deve ter no mínimo 3 caracteres",
							},
							pattern: {
								value: /^[A-Za-z]+$/i,
								message: "O nome deve conter apenas letras",
							},
						})}
					/>
					{errors.name && (
						<Text color={"red.400"} size={"sm"}>
							{errors.name.message}
						</Text>
					)}
				</FormControl>

				<FormControl mb={1} isInvalid={errors.email}>
					<FormLabel ms={2} mb={0}>
						Email
					</FormLabel>
					<Input
						type="email"
						placeholder="Digite seu email"
						{...register("email", {
							required: "O email é obrigatório",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "email inválido",
							},
						})}
					/>
					{errors.email && (
						<Text color={"red.400"} size={"sm"}>
							{errors.email.message}
						</Text>
					)}
				</FormControl>

				<FormControl mb={1} isInvalid={errors.password}>
					<FormLabel ms={2} mb={0}>
						Password
					</FormLabel>
					<InputGroup size="md">
						<Input
							type={show ? "text" : "password"}
							placeholder="Password"
							{...register("password", {
								required: "A senha é obrigatória",
								minLength: {
									value: 8,
									message: "A senha deve ter pelo menos 8 caracteres",
								},
								pattern: {
									value:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message:
										"A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial",
								},
							})}
						/>
						{errors.password && (
							<Text color={"red.400"} size={"sm"}>
								{errors.password.message}
							</Text>
						)}
						<InputRightElement width="4.5rem">
							{show ? (
								<ViewOffIcon h={5} w={5} onClick={handleClick} />
							) : (
								<ViewIcon h={5} w={5} onClick={handleClick} />
							)}
						</InputRightElement>
					</InputGroup>
				</FormControl>

				<FormControl imb={1} isInvalid={errors.confirmPassword}>
					<FormLabel ms={2} mb={0}>
						Confirm Password
					</FormLabel>
          <InputGroup size="md">
					<Input

            type={showConfirm ? "text" : "password"}
						placeholder="Confirm Password"
						{...register("confirmPassword", {
							required: "Confirme a senha",
							validate: (value) =>
								value === password || "As senhas não correspondem",
						})}
					/>
					{errors.confirmPassword && (
						<Text color={"red.400"} size={"sm"}>
							{errors.confirmPassword.message}
						</Text>
					)}
          <InputRightElement width="4.5rem">
							{showConfirm ? (
								<ViewOffIcon h={5} w={5} onClick={handleConfirmClick}/>
							) : (
								<ViewIcon h={5} w={5} onClick={handleConfirmClick}/>
							)}
						</InputRightElement>
          </InputGroup>
				</FormControl>

				<Button
					type="submit"
					variant="solid"
					w="100%"
					mt={4}
					fontSize={{ base: "md", md: "lg" }}>
					Register
				</Button>
			</VStack>
		</Flex>
	);
};

export default Register;
