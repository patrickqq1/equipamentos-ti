import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../services/context/AuthContext";
import api from "../../services/api";

const ChangeUsernameModal: React.FC = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const { user } = useAuth();
  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    setNewUsername(""); // Limpa o campo de entrada do novo nome de usuário
  };

  const handleChangeUsername = async (e: any) => {
    e.preventDefault();
    await api
      .put("/api/update/users", { username: newUsername })
      .then(() => {
        toast({
          title: "Nome alterado com sucesso!",
          description: `O seu novo username é ${newUsername}. As operações so vao surtir efeito no proximo login`,
          status: "success",
          duration: 5000,
        });
      })
      .catch(() => {
        console.log("Erro ao tentar mudar o username");
        toast({
          title: "Falha na operação.",
          status: "error",
          duration: 5000,
        });
      });
    onClose(); // Fecha o modal
  };

  return (
    <>
      <MenuItem onClick={onOpen} color="black">
        Configurações
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleChangeUsername}>
          <ModalHeader>Alterar Nome de Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome de Usuário Atual:</FormLabel>
              <Input value={user as string} isReadOnly />
              <FormLabel>Novo Nome de Usuário:</FormLabel>
              <Input
                placeholder="Novo Nome de Usuário"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeUsernameModal;
