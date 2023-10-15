import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertStatus,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../../services/context/AuthContext";

interface Status {
  status: AlertStatus;
  title: string | null;
  description: string | null;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<Status | null>();

  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!username || !password){
      setStatus({
        status: "error",
        title: "ocorreu um erro!",
        description: "Preencha todos os dados!"
      })
      setTimeout(() => {
        setStatus(null)
      }, 3000)
      return
    }
    login(username, password).then().catch(err => {
      setStatus({
        status: "error",
        title:"Erro ao fazer o login!",
        description:`${err}`
      })
      setTimeout(() => {
        setStatus(null);
      }, 3000)
    })
  };
  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="green.200"
    >
      <Box
        as="form"
        onSubmit={handleLogin}
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Flex justifyContent="center" m={5}>
          <Img src={"undraw_order_delivered_re_v4ab.svg"} h="120px" />
        </Flex>
        <Heading textAlign="center">Sistema de estoque T.I</Heading>
        <Stack mt="20px">
          <Input
            placeholder="Usuario AD"
            variant="filled"
            borderRadius="20px"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Senha"
            variant="filled"
            borderRadius="20px"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!status?.description ? null : (
            <Alert status={status?.status}>
              <AlertIcon />
              <Box>
                <AlertTitle>{status?.title}</AlertTitle>
                <AlertDescription>{status?.description}</AlertDescription>
              </Box>
            </Alert>
          )}
          <Button
            bg="green.400"
            color="white"
            borderRadius="20px"
            _hover={{
              bg: "green.500",
              color: "white",
              borderRadius: 4,
              transform: "scale(1.05)",
              transition: "transform 0.2s",
            }}
            type="submit"
          >
            Entrar
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
