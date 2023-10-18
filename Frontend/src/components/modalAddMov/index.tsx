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
  useDisclosure,
  Textarea,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { RiSwapBoxFill } from "react-icons/ri";
import api from "../../services/api";

interface ModalProps {
  itemName: string;
  itemId: number;
}

const AddMovModal: React.FC<ModalProps> = ({ itemName, itemId }) => {
  const toast = useToast()
  const today = new Date().toISOString().split("T")[0]
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState<number>(0);
  const [movementDate, setMovementDate] = useState<string>(today);
  const [reason, setReason] = useState<string>("");
  const [movementType, setMovementType] = useState<"Retirada" | "Acrescimo">(
    "Retirada"
  );

  const newMov = async (e: any) => {
    e.preventDefault();
    try {
      await api.put(`/api/edit/equipament/${itemId}`, {
        value: quantity,
        movement_date: movementDate,
        reason: reason,
        type: movementType,
      });
      onClose()
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Erro',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
      })
    }
  };
  // value, movement_date, reason
  return (
    <div>
      <Button
        bg="green.400"
        color="white"
        _hover={{
          backgroundColor: "green.200",
        }}
        onClick={onOpen}
        w="100%"
        leftIcon={<RiSwapBoxFill size="23px" />}
      >
        Realizar nova movimentação
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={newMov}>
          <ModalHeader>Adicionar Movimentação em "{itemName}"</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as={Stack}>
              <FormLabel>Quantidade:</FormLabel>
              <Input
                placeholder="Defina nova quantidade"
                variant="filled"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
              <FormLabel>Data de movimentação:</FormLabel>
              <Input
                type="date"
                variant="filled"
                value={movementDate}
                onChange={(e) => setMovementDate(e.target.value)}
              />
              <FormLabel>Descreva a movimentação:</FormLabel>
              <Textarea
                placeholder="Motivo"
                variant="filled"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <FormLabel>Motivo:</FormLabel>
              <Select
                value={movementType}
                onChange={(e) =>
                  setMovementType(e.target.value as "Retirada" | "Acrescimo")
                }
              >
                <option>Retirada</option>
                <option>Acrescimo</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} type="submit">
              Movimentar
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddMovModal;
