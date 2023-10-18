import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import ModalAddItem from "../../components/modalAddItem";
import api from "../../services/api";
import { BiRefresh } from "react-icons/bi"
import AddMovModal from "../../components/modalAddMov";

interface EquipamentsInterface {
  id: number;
  name: string;
  acquisition_date: string;
  value: number;
  added_by: number;
  quantity_total: number;
  quantity_in_stock: number;
  created_at: Date;
  updated_at: Date;
}

interface EquipamentsMovInterface {
  id: number;
  equipment_id: number;
  reason: string;
  quantity_out: number;
  quantity_in: number;
  movement_date: string;
  movement_type: "Retirada" | "Acrescimo";
  user_id: number;
  username: string;
}
const HomePage: React.FC = () => {
  const toast = useToast()
  const [itens, setItens] = useState<EquipamentsInterface[]>([]);
  const [itensMov, setItensMov] = useState<EquipamentsMovInterface[]>([]);
  const [count, setCount] = useState<number>(0);

  const getItens = async () => {
    try {
      const response = await api.get("/api/get/equipament");
      setItens(response.data.data);
      toast({
        title: "Sucesso",
        description: `Carregado ${response.data.data.length} equipamentos`,
        status: "success",
        duration: 5000,
        variant: "top-accent"
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getItensById = async (id: number) => {
    try {
      const response = await api.get(`/api/get/movhistorybyid/${id}`);
      setItensMov(response.data.data);
      console.log(itensMov);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItens();
  }, [count]);
  return (
    <React.Fragment>
      <NavBar />
      <Flex
      padding="10%"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        bg="whitesmoke"
      >
        <Flex direction="column" alignItems="center">
          <Stack direction="row" zIndex="1">
            <ModalAddItem />
            <IconButton aria-label="Recarregar!" colorScheme="orange" icon={<BiRefresh size="23px"/>} onClick={() => setCount(count + 1)} />
          </Stack>
          <Box m="5">
            <Accordion>
              {itens.map((index) => (
                <AccordionItem key={index.id} bg="gray.200" p="5px">
                  <AccordionButton onClick={() => getItensById(index.id)}>
                    <Box as="span" flex="1" textAlign="left">
                      <b>Nome:</b> {index.name}
                    </Box>
                    <Box as="span" flex="1" textAlign="left">
                      <b>Quantidade em estoque:</b> {index.quantity_in_stock}
                    </Box>
                    <Box as="span" flex="1" textAlign="left">
                      <b>Quantidade total:</b> {index.quantity_total}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <AddMovModal itemName={index.name} itemId={index.id} />
                    <Text mt="5" fontSize="sm">
                      Historico de movimentações:
                    </Text>
                    <br />
                    <Flex p="10px">
                      {itensMov.length > 0 ? (
                        <TableContainer border="1px solid #ccc" borderRadius="20px">
                          <Table variant="simple" colorScheme="green">
                            <Thead bg="green.200">
                              <Tr>
                                <Th color="black">Razão</Th>
                                <Th color="black">Data de movimentação</Th>
                                <Th color="black">Tipo de movimentação</Th>
                                <Th color="black">Quantidade de saida</Th>
                                <Th color="black">Quantidade de entrada</Th>
                                <Th color="black">Usuario que movimentou</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {itensMov.map((index) => (
                                <Tr key={index.id}>
                                  <Td>{index.reason}</Td>
                                  <Td>{new Date(index.movement_date).toISOString().split('T')[0]}</Td>
                                  <Td>{index.movement_type}</Td>
                                  <Td>{index.quantity_out}</Td>
                                  <Td>{index.quantity_in}</Td>
                                  <Td>{index.username}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <p>Não há movimentações</p>
                      )}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default HomePage;
