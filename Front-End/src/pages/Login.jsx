import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	VStack,
	Heading,
	Input,
	FormControl,
	FormLabel,
	Text,
	useToast,
	Box,
	Flex,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation } from "../shared/validation";
import { API } from "../services/api"; "../services/api";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	//Instance of useNavigate and useToast to send messages management
	const navigate = useNavigate();
	const toast = useToast();

	const handleClick = () => setShow(!show);

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const response = await API.post("/auth/login", data);

			toast({
				title: response.data.message,
				description: "Redirecionando você...",
				status: "success",
				duration: 3000,
				isClosable: true,
			});

			if (response.data.type === "admin") {
				navigate("/admin");
			}
			else {
				navigate("/home");
			}
			reset();
			setIsLoading(false);
			
		} catch (error) {
			setIsLoading(false);
			toast({
				title: "Erro ao realizar login",
				description: error.response.data.error,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	}

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
				mx="auto"
        >
				<FormControl mb={1} isRequired isInvalid={errors.email}>
					<FormLabel ms={2} mb={0}>
						Email
					</FormLabel>
          <InputGroup size="md" flexDir={"column"}>
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email", emailValidation)}
              />
            {errors.email && (
              <Text color={"red.400"} size={"sm"}>
                {errors.email.message}
              </Text>
            )}
          </InputGroup>
				</FormControl>

				<FormControl imb={1} isRequired isInvalid={errors.Password}>
					<FormLabel ms={2} mb={0}>
						Password
					</FormLabel>
					<InputGroup size="md" flexDir={"column"}>
							<Input
								type={show ? "text" : "password"}
								placeholder="Password"
								{...register("password")}
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

				<Button
					type="submit"
					variant="solid"
					w="100%"
					mt={4}
					fontSize={{ base: "md", md: "lg" }}
					isLoading={isLoading}>
					Login
				</Button>
				<Box>
					<Text align={"center"} fontSize={"sm"} mt={2}>
						Não tem uma conta?
					</Text>
					<Link to="/register">
						<Text align={"center"} fontSize={"sm"} mt={1}>
							Registre-se
						</Text>
					</Link>
				</Box>
			</VStack>
		</Flex>
	);
};

export default Login;
