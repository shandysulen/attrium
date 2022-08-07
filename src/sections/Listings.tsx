import { Flex, HStack, Select, StackProps, Text, VStack } from '@chakra-ui/react';
import { NFTPreview } from '@zoralabs/nft-components';
import { useNFT } from '@zoralabs/nft-hooks';
import { ZDK } from '@zoralabs/zdk';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, NOUNS_ADDRESS, pagePaddingX, ZORA_API_ENDPOINT } from '../constants';

export const Listings: React.FC<StackProps> = (props) => {
    const [attributeNames, setAttributeNames] = useState<string[]>([]);
    const { data, error } = useNFT('0xbe7fbe5a683b37728bfe91b1939a204196fd056a', '1');

    console.log(data);
    console.log(error);

    useEffect(() => {
        const fetchAttributeNames = async () => {
            const args = {
                where: {
                    collectionAddresses: [NOUNS_ADDRESS]
                }
            };

            const zdk = new ZDK({ endpoint: ZORA_API_ENDPOINT });
            const response = await zdk.aggregateAttributes(args);

            setAttributeNames(response.aggregateAttributes.map(attribute => attribute.traitType));
        };

        fetchAttributeNames();
    }, []);

    return (
        <VStack alignItems='flex-start' w='100%' px={pagePaddingX} {...props}>
            <HStack w='100%' justifyContent='space-between' pr='16px'>
                <HStack spacing='20px' ml='16px'>
                    <VStack alignItems='flex-start' spacing='0'>
                        <Text as='span' fontWeight='bold'>Attribute Type</Text>
                        <Select w='200px' ml='16px'>
                            <option value='All'>All</option>
                            {attributeNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </Select>
                    </VStack>
                    <VStack alignItems='flex-start' spacing='0'>
                        <Text as='span' fontWeight='bold'>Sort</Text>
                        <Select w='200px' ml='16px'>
                            <option value='Price Ascending'>Price Ascending</option>
                            <option value='Price Descending'>Price Descending</option>
                            <option value='Recent'>Most Recent</option>
                            <option value='Oldest'>Oldest</option>
                        </Select>
                    </VStack>
                </HStack>
                <Text as='span'><b>6</b> items</Text>
            </HStack>
            <Flex wrap='wrap'>
                <NFTPreview contract={CONTRACT_ADDRESS} id='1' />
                <NFTPreview contract={CONTRACT_ADDRESS} id='2' />
                <NFTPreview contract={CONTRACT_ADDRESS} id='3' />
            </Flex>
        </VStack>
    );
};
