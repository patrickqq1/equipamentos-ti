import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../services/context/AuthContext";
import { useLocation } from "react-router-dom";
import ChangeUsernameModal from "../modalEditName";

const NavBar: React.FC = () => {
  const { role, user, logout } = useAuth();
  const location = useLocation();
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
      zIndex="2"
    >
      <Text fontSize="25px" fontWeight="bold">
        Equipamentos T.I
      </Text>
      <Box>
        <Stack direction="row" alignItems="center">
          <Divider orientation="vertical" borderColor="white" mx="2" h="60%" />
          <Button
            as="a"
            href="/home"
            variant={location.pathname === "/home" ? "solid" : "ghost"}
            color={location.pathname === "/home" ? "black" : "white"}
            _hover={{
              bg: "#1e9756",
            }}
            boxShadow="md"
          >
            Inicio
          </Button>
          <Button
            as="a"
            href="/equipments"
            variant={location.pathname === "/equipments" ? "solid" : "ghost"}
            color={location.pathname === "/equipments" ? "black" : "white"}
            _hover={{
              bg: "#1e9756",
            }}
            boxShadow="md"
          >
            Equipamentos
          </Button>
          {role ? (
            <Button
              as="a"
              href="/users"
              variant="ghost"
              color="white"
              _hover={{
                bg: "#1e9756",
              }}
              boxShadow="md"
            >
              Usuarios
            </Button>
          ) : null}
          <Flex
            direction="row"
            alignItems="center"
            bg="whitesmoke"
            p="3px"
            borderRadius="30px"
            w="160px"
          >
            <Menu>
              <Avatar as={MenuButton}/>
              <MenuList>
                <ChangeUsernameModal />
                <MenuItem color="red" onClick={logout}>Sair</MenuItem>
              </MenuList>
            <Text ml="3px" fontSize="15px" color="black">
              Bem-vindo!<br></br> <b>{user}</b>
            </Text>
            </Menu>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NavBar;
