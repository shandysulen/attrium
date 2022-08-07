import { Flex, HStack, Select, SlideFade, Spinner, StackProps, Text, VStack } from '@chakra-ui/react';
import { ZDK } from '@zoralabs/zdk';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS, MATIC_ADDRESS, NOUNS_ADDRESS, pagePaddingX, ZORA_API_ENDPOINT, ZORA_ASKS_MUMBAI_ADDRESS } from '../constants';
import bodyAttributeABI from '../abi/attrium-nouns-body-attribute.json';
import zoraAsksABI from '../abi/zora-asks-mumbai.json';
import axios from 'axios';
import { Result } from 'ethers/lib/utils';
import { NFTCard, NFTCardProps } from '../components/NFTCard';

const NFTCardListing: React.FC<NFTCardProps> = (props) => {
    const { writeAsync } = useContractWrite({
        addressOrName: ZORA_ASKS_MUMBAI_ADDRESS,
        contractInterface: zoraAsksABI,
        functionName: 'fillAsk',
        mode: 'recklesslyUnprepared',
        args: [
            props.price,
            ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS,
            props.tokenID,
            MATIC_ADDRESS,
            100
        ]
    });

    const onClick = useCallback(() => writeAsync(), [writeAsync]);

    return (
        <NFTCard {...props} cursor='buy-cursor.png' onClick={onClick} />
    );
};

export const Listings: React.FC<StackProps> = (props) => {
    const [listings, setListings] = useState<NFTCardProps[]>([]);
    const [attributeNames, setAttributeNames] = useState<string[]>([]);
    const { data: baseURI, isFetching: isFetchingBaseURI } = useContractRead({
        addressOrName: ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS,
        contractInterface: bodyAttributeABI,
        functionName: 'baseURI',
    });
    const { data: totalSupply, isFetching: isFetchingTotalSupply } = useContractRead({
        addressOrName: ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS,
        contractInterface: bodyAttributeABI,
        functionName: 'totalSupply',
    });
    const { data: ask1, isFetching: isFetchingAsk1 } = useContractRead({
        addressOrName: ZORA_ASKS_MUMBAI_ADDRESS,
        contractInterface: zoraAsksABI,
        functionName: 'askForNFT',
        args: [ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS, 1]
    });
    const { data: ask2, isFetching: isFetchingAsk2 } = useContractRead({
        addressOrName: ZORA_ASKS_MUMBAI_ADDRESS,
        contractInterface: zoraAsksABI,
        functionName: 'askForNFT',
        args: [ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS, 2],
    });
    const { data: ask3, isFetching: isFetchingAsk3 } = useContractRead({
        addressOrName: ZORA_ASKS_MUMBAI_ADDRESS,
        contractInterface: zoraAsksABI,
        functionName: 'askForNFT',
        args: [ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS, 3],
    });

    const asks: Record<number, Result> = {
        1: ask1,
        2: ask2,
        3: ask3,
    };

    useEffect(() => {
        const parsedTotalSupply = parseInt(totalSupply._hex, 16);
        if (baseURI && parsedTotalSupply && ask1) {
            const fetchMetadata = async () => {
                const fetchedListings = [];

                for (let i = 1; i <= (parsedTotalSupply as unknown as number); i++) {
                    // Grab metadata
                    const url = 'https://ipfs.io/ipfs/' + baseURI.slice(7) + i + '.json';
                    const metadata = (await axios.get(url)).data;

                    // Compose image URL
                    const imageUrl = 'https://ipfs.io/ipfs/' + metadata.image.slice(7);

                    // Search for listing
                    fetchedListings.push({ ...metadata, image: imageUrl, price: parseInt(asks[i]?.askPrice._hex, 16), tokenID: i });
                }

                setListings(fetchedListings);
            };

            fetchMetadata();
        }
    }, [baseURI, totalSupply]);

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

    const isFetching = useMemo(() =>
        isFetchingBaseURI || isFetchingTotalSupply || isFetchingAsk1 || isFetchingAsk2 || isFetchingAsk3,
        [isFetchingBaseURI, isFetchingTotalSupply, isFetchingAsk1, isFetchingAsk2, isFetchingAsk3]
    );

    return (
        <VStack alignItems='flex-start' w='100%' px={pagePaddingX} {...props}>
            <HStack w='100%' justifyContent='space-between' pr='16px'>
                <HStack spacing='20px'>
                    <VStack alignItems='flex-start' spacing='0'>
                        <Text as='span' fontWeight='bold'>Attribute Type</Text>
                        <Select w='200px' ml='16px' disabled>
                            <option value='body'>body</option>
                            <option value='All' disabled>All</option>
                            {attributeNames.filter(attribute => attribute !== 'body').map(name => (
                                <option key={name} value={name} disabled>{name}</option>
                            ))}
                        </Select>
                    </VStack>
                    <VStack alignItems='flex-start' spacing='0'>
                        <Text as='span' fontWeight='bold'>Sort</Text>
                        <Select w='200px' ml='16px'>
                            <option value='Price Ascending'>Price Ascending</option>
                            <option value='Price Descending'>Price Descending</option>
                        </Select>
                    </VStack>
                </HStack>
                <Text as='span'><b>{listings.length}</b> item{listings.length === 1 ? '' : 's'}</Text>
            </HStack>
            {isFetching ? (
                <Flex justifyContent='center' alignItems='center' w='100%' h='400px'>
                    <Spinner size='xl' />
                </Flex>
            ) : (
                <SlideFade in={true} offsetY='40px' transition={{ enter: { duration: 0.5 } }}>
                    <Flex wrap='wrap' mt='40px' gap='40px'>
                        {listings.map(listing => (
                            <NFTCardListing key={listing.name} {...listing} />
                        ))}
                    </Flex>
                </SlideFade>
            )}
        </VStack>
    );
};
