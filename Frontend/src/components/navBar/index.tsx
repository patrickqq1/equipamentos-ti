import { Avatar, Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../services/context/AuthContext";

const NavBar: React.FC = () => {
  const { role, logout } = useAuth()
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      backgroundColor="green.500"
      color="white"
      position="fixed"
      top={0}
      w="100%"
    >
      <Text fontSize="25px" fontWeight="bold">
        Equipamentos T.I
      </Text>
      <Box>
        <Stack direction="row">
          <Avatar />
          <Divider orientation="vertical" borderColor="white" mx="2" h="60%" />
          <Button as="a" href="/home" variant="ghost" color="white" _hover={{
            bg: "#1e9756"
          }} boxShadow="md">Inicio</Button>
          <Button as="a" href="/equipments" variant="ghost" color="white" _hover={{
            bg: "#1e9756"
          }} boxShadow="md">Equipamentos</Button>
          {role ? <Button as="a" href="/users" variant="ghost" color="white" _hover={{
            bg: "#1e9756"
          }} boxShadow="md">Usuarios</Button> : null}
          <Button bg="red.600" color="white" _hover={{
            bg: "red.500"
          }} boxShadow="md" onClick={logout}>Sair</Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NavBar;
