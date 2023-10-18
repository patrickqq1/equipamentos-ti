import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../../services/api";

const ModalAddItem: React.FC = () => {
  const toast = useToast();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
        name: productName, 
        acquisition_date: date, 
        quantity_total: quantity, 
        quantity_in_stock: stockQuantity, 
        value: stockQuantity
    };
    await api
      .post("/api/add/equipament", newItem)
      .then((result) => {
        console.log(result.data);
        toast({
          title: "Sucesso",
          description: `Equipamento ${newItem.name} adicionado com sucesso!`,
          status: "success",
          duration: 2000,
        });
      })
      .catch((err) =>
        toast({
          title: "Erro",
          description:
            err.response.data.message ||
            "Ocorreu um erro ao tentar cadastrar o equipamento.",
          status: "error",
          duration: 2000,
        })
      );
    setProductName("");
    setQuantity(0);
    setStockQuantity(0);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bg="green.300" color="white" _hover={{
        bg: "green.500"
      }}>Adicionar item</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleAddItem}>
          <ModalHeader>Adicione um item</ModalHeader>
          <ModalBody>
            <FormControl as={Stack}>
              <FormLabel>Nome do produto</FormLabel>
              <Input
                placeholder="Nome do produto"
                variant="filled"
                borderRadius="20px"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                isRequired
              />
              <FormLabel>Data de aquisição</FormLabel>
              <Input
                placeholder="Data de aquisição"
                variant="filled"
                borderRadius="20px"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                isRequired
              />
              <FormLabel>Quantidade total</FormLabel>
              <Input
                placeholder="Quantidade total"
                variant="filled"
                borderRadius="20px"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                isRequired
              />
              <FormLabel>Quantidade em estoque</FormLabel>
              <Input
                placeholder="Quantidade em estoque"
                variant="filled"
                borderRadius="20px"
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(parseInt(e.target.value, 10))}
                isRequired
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Stack direction="row">
              <Button colorScheme="green" type="submit">
                Adicionar
              </Button>
              <Button onClick={onClose} colorScheme="red">
                Fechar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddItem;
