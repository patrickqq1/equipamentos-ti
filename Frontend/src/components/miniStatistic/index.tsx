import React from "react";
import { Card, CardBody, Flex, Icon, Stat, StatHelpText, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";

interface StatisticsComponent {
  title: string;
  amount: number;
  percentage: number;
  icon: any;
}

const MiniStatistics: React.FC<StatisticsComponent> = ({
  title,
  amount,
  percentage,
  icon,
}) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card>
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize='lg' color={textColor}>
                {amount}
              </StatNumber>
              <StatHelpText alignSelf='flex-end'
              justifySelf='flex-end'
              m='0px'
              color={percentage < 50 ? "red.400" : "green.400"}
              fontWeight='bold'
              ps='3px'
              fontSize='md'>
                {percentage > 0 ? `${percentage}%` : `${percentage}%`}
              </StatHelpText>
            </Flex>
          </Stat>
          <Icon h="45px" w="45px">
            {icon}
          </Icon>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
