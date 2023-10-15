import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/context/AuthContext";
import NavBar from "../../components/navBar";
import MiniStatistics from "../../components/miniStatistic";
import { FiMenu } from "react-icons/fi";
import api from "../../services/api";

interface ItensData {
  id: number;
  name: string;
  movement_date: string;
  movement_type: string;
  placed_by_name: string;
  taken_by_name: string;
}

interface lastMov {
  id: number;
  name: string;
  movement_date: string;
  movement_type: string;
  placed_by_name: string;
  taken_by_name: string;
}

const HomePage: React.FC = () => {
  const [itens, setItens] = useState<Array<ItensData>>([]);
  const [lastMov, setLastMov] = useState<Array<lastMov>>([]);
  const { user } = useAuth();

  const getData = async () => {
    try {
      const response = await api.get("/api/get/equipament_mov/");
      setItens(response.data.data);
      console.log(response.data.data);
      setLastMov(response.data.lastMov);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <Flex
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        bg="whitesmoke"
      >
        <Box>
          <Heading>Seja bem-vindo, {user}!</Heading>
          <SimpleGrid columns={3} spacing="24px" mt="2%">
            <MiniStatistics
              amount={15}
              icon={FiMenu}
              percentage={15}
              title="Itens em manuntenção"
            />
            <MiniStatistics
              amount={0}
              icon={FiMenu}
              percentage={0}
              title="Itens em uso"
            />
            <MiniStatistics
              amount={0}
              icon={FiMenu}
              percentage={0}
              title="Itens disponivel"
            />
          </SimpleGrid>
          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            mt="1%"
          >
            <GridItem
              rowSpan={2}
              colSpan={1}
              bg="white"
              boxShadow="md"
              borderRadius="10px"
              padding="5%"
            >
              <Heading fontSize="18px">Equipamentos em manutenção:</Heading>
              {lastMov.map(index => (
                <Card key={index.id}>
                  {index.movement_type === "Manutenção" ? index.name : null}
                </Card>
              ))}
            </GridItem>
            <GridItem
              colSpan={2}
              bg="white"
              boxShadow="md"
              borderRadius="10px"
              padding="2%"
            >
              <Heading fontSize="18px">Ultimo equipamento adicionado:</Heading>
              {lastMov.map(index => (
                <Card key={index.id}>
                  {index.movement_type === "Retirada" ? index.name : null}
                </Card>
              ))}
            </GridItem>
            <GridItem
              colSpan={2}
              bg="white"
              boxShadow="md"
              borderRadius="10px"
              padding="2%"
            >
              <Heading fontSize="18px">
                Ultimo equipamento enviado a manuntenção:
              </Heading>
              <Box></Box>
            </GridItem>
            <GridItem
              colSpan={4}
              bg="white"
              boxShadow="md"
              borderRadius="10px"
              padding="1%"
            >
              <Heading fontSize="18px">Última manutenção realizada</Heading>
              <Box></Box>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default HomePage;
