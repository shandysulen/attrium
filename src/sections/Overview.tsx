import {
    Box,
    Button, Heading, HStack, Image, Link, SimpleGrid, Spacer, Stat as ChakraStat,
    StatGroup, StatLabel, StatNumber, Text, Tooltip, VStack
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, NOUNS_ADDRESS, pagePaddingX, ZORA_API_ENDPOINT } from '../constants';
import { MdContentCopy } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';
import { ZDK } from '@zoralabs/zdk';
import kconvert from 'k-convert';

const PolyganScanTooltip: React.FC = () => (
    <HStack>
        <Image src='/polygon-logo.png' boxSize='16px' />
        <Text>Polygonscan</Text>
    </HStack>
);

interface StatProps {
    readonly title: string;
    readonly value: string | number;
}

const Stat: React.FC<StatProps> = ({ title, value }) => (
    <ChakraStat flex={'none'}>
        <StatLabel>{title}</StatLabel>
        <StatNumber>{value}</StatNumber>
    </ChakraStat>
);

export const Overview = () => {
    const [numItems, setNumItems] = useState(0);
    const [numOwners, setNumOwners] = useState(0);
    const [volume, setVolume] = useState(0);
    const [floor, setFloor] = useState(0);
    const [numAttributesTypes, setNumAttributesTypes] = useState(0);
    const [copyTooltipLabel, setCopyTooltipLabel] = useState<React.ReactNode>('Copy');

    useEffect(() => {
        const fetchNumAttributes = async () => {
            const zdk = new ZDK({ endpoint: ZORA_API_ENDPOINT });
            let args: any = { collectionAddress: NOUNS_ADDRESS };

            // Compute number of items and owners
            const { aggregateStat } = await zdk.collectionStatsAggregate(args);
            setNumItems(aggregateStat.nftCount);
            setNumOwners(aggregateStat.ownerCount);
            setVolume(kconvert.convertTo(aggregateStat.salesVolume.chainTokenPrice));
            setFloor(aggregateStat.floorPrice);

            // Compute attribute types
            args = { where: { collectionAddresses: [NOUNS_ADDRESS] } };
            const attributesResponse = await zdk.aggregateAttributes(args);
            setNumAttributesTypes(attributesResponse.aggregateAttributes.length);
        };

        fetchNumAttributes();
    }, []);

    const copyAddress = useCallback(() => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS);
        setCopyTooltipLabel((
            <HStack>
                <BsCheckCircle color='green' />
                <Text as='span'>Copied</Text>
            </HStack>
        ));
        setTimeout(() => setCopyTooltipLabel('Copy'), 500);
    }, [setCopyTooltipLabel]);

    return (
        <HStack w='100%' px={pagePaddingX} py='40px' justifyContent='space-between' alignItems='flex-start' shadow='md'>
            <HStack alignItems='flex-start'>
                <Image src='/nouns.jpg' boxSize='64px' rounded='full' />
                <VStack alignItems='flex-start' spacing='0'>
                    <Heading as='h1' size='lg' fontWeight='bold'>Nouns</Heading>
                    <HStack spacing='0'>
                        <Tooltip label={<PolyganScanTooltip />} hasArrow>
                            <Link href='polygonscan.com/address/'>{CONTRACT_ADDRESS.slice(0, 6) + '...' + CONTRACT_ADDRESS.slice(-4)}</Link>
                        </Tooltip>
                        <Tooltip label={copyTooltipLabel} hasArrow>
                            <Button size='sm' py='10px' shadow='none' bg='none' _hover={{ bg: 'white', color: '#A87CFF' }} onClick={copyAddress}>
                                <MdContentCopy color='inherit' />
                            </Button>
                        </Tooltip>
                    </HStack>
                    <Text pt='20px'>One Noun, every day, forever.</Text>
                </VStack>
            </HStack>
            <SimpleGrid columns={4} spacing={10} w='60%'>
                <Stat title='Items' value={numItems} />
                <Stat title='Owners' value={numOwners} />
                <Stat title='Volume (ETH)' value={volume} />
                <Stat title='Floor (ETH)' value={floor} />
                <Stat title='Attribute Types' value={numAttributesTypes} />
                <Stat title='Attribute Values' value={424} />
                <Stat title='Volume (ETH)' value={'---'} />
                <Stat title='Floor (ETH)' value={'---'} />
            </SimpleGrid>
        </HStack>
    );
};