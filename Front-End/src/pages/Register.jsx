// Imports React Hook Form
import { useForm } from "react-hook-form";

// Imports Chakra UI
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

// Imports React e hooks adicionais
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Imports API
import { API } from "../services/api";

const Register = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();
	const password = watch("password");
	const toast = useToast();
	const [show, setShow] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const handleClick = () => setShow(!show);
	const handleConfirmClick = () => setShowConfirm(!showConfirm);

	// Função de envio do formulário
	const onSubmit = async (data) => {
		try {
			const userData = {
				name: data.name,
				email: data.email,
				password: data.password,
				type: "user", // Adapte conforme necessário
			};

			const response = await API.post("/auth/register", userData);

			toast({
				title: "Registro realizado com sucesso!",
				description: response.data.message || "Conta criada com sucesso.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});

			reset(); // Limpa o formulário
			setTimeout(() => navigate("/login"), 2000); // Redireciona após 2 segundos
		} catch (error) {
			// Trata erros
			toast({
				title: "Erro ao registrar",
				description: error.response?.data?.message || "Não foi possível criar sua conta.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex maxW="2xl" mx="auto" direction="column" align="center">
			<Heading
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				bgClip="text"
				fontSize={{ base: "2xl", md: "4xl" }}
				textAlign="center"
				my={10}
			>
				ALLOWANCE
			</Heading>

			<VStack
				as="form"
				onSubmit={handleSubmit(onSubmit)}
				align="center"
				w={{ base: "80%", md: "50%", xl: "50%" }}
				mx="auto"
			>
				<FormControl mb={1} isInvalid={errors.name}>
					<FormLabel ms={2} mb={0}>
						Name
					</FormLabel>
					<Input
						type="text"
						placeholder="Digite seu nome"
						{...register("name", {
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
							{...register("password")}
						/>
						<InputRightElement width="4.5rem">
							{show ? (
								<ViewOffIcon h={5} w={5} onClick={handleClick} />
							) : (
								<ViewIcon h={5} w={5} onClick={handleClick} />
							)}
						</InputRightElement>
					</InputGroup>
					{errors.password && (
						<Text color={"red.400"} size={"sm"}>
							{errors.password.message}
						</Text>
					)}
				</FormControl>

				<FormControl mb={1} isInvalid={errors.confirmPassword}>
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
						<InputRightElement width="4.5rem">
							{showConfirm ? (
								<ViewOffIcon h={5} w={5} onClick={handleConfirmClick} />
							) : (
								<ViewIcon h={5} w={5} onClick={handleConfirmClick} />
							)}
						</InputRightElement>
					</InputGroup>
					{errors.confirmPassword && (
						<Text color={"red.400"} size={"sm"}>
							{errors.confirmPassword.message}
						</Text>
					)}
				</FormControl>

				<Button
					type="submit"
					variant="solid"
					w="100%"
					mt={4}
					fontSize={{ base: "md", md: "lg" }}
				>
					Register
				</Button>
			</VStack>
		</Flex>
	);
};

export default Register;
