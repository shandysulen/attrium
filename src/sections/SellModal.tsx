import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalProps,
    Text,
    Button,
    Flex,
    VStack,
    Link,
    ButtonProps,
    HStack,
    Spinner,
    SimpleGrid,
    Input,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { NFTCard, NFTCardProps } from '../components/NFTCard';
import { ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS, MATIC_ADDRESS, ZORA_ASKS_MUMBAI_ADDRESS } from '../constants';
import bodyAttributeABI from '../abi/attrium-nouns-body-attribute.json';
import axios from 'axios';
import { useSellModal } from '../hooks/useSellModal';
import zoraAsksABI from '../abi/zora-asks-mumbai.json';
import confetti from 'canvas-confetti';

const NextButton: React.FC<ButtonProps> = (props) => (
    <Button {...props}>
        Next
    </Button>
);

const ColdStart: React.FC = () => (
    <>
        <ModalBody>
            Connect your wallet to view your NFTs.
        </ModalBody>
        <ModalFooter justifyContent='center'>
            <Button bg='white' fontWeight='bold'>
                <ConnectButton />
            </Button>
        </ModalFooter>
    </>
);

interface NFTSelectionProps {
    selectedToken: NFTCardProps | undefined;
    setSelectedToken: (token: NFTCardProps) => void;
    setIsTokenConfirmed: (value: boolean) => void;
}

const NFTSelection: React.FC<NFTSelectionProps> = ({
    selectedToken,
    setSelectedToken,
    setIsTokenConfirmed
}) => {
    const { address } = useAccount();
    const [balance, setBalance] = useState<number>(0);
    const [tokens, setTokens] = useState<NFTCardProps[]>([]);

    const { data: baseURI, isFetching: isFetchingBaseURI } = useContractRead({
        addressOrName: ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS,
        contractInterface: bodyAttributeABI,
        functionName: 'baseURI',
    });

    const { data: tokenBalance, isFetching: isFetchingTokenBalance } = useContractRead({
        addressOrName: ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS,
        contractInterface: bodyAttributeABI,
        functionName: 'balanceOf',
        args: address
    });

    useEffect(() => {
        if (tokenBalance) {
            setBalance(parseInt(tokenBalance._hex, 16));
        }
    }, [tokenBalance]);

    const isFetching = useMemo(() =>
        isFetchingTokenBalance || isFetchingBaseURI,
        [isFetchingTokenBalance, isFetchingBaseURI]
    );

    useEffect(() => {
        if (baseURI && balance) {
            const fetchMetadata = async () => {
                const fetchedTokens = [];

                for (let i = 1; i <= balance; i++) {
                    // Grab metadata
                    const url = 'https://ipfs.io/ipfs/' + baseURI.slice(7) + i + '.json';
                    const metadata = (await axios.get(url)).data;

                    // Compose image URL
                    const imageUrl = 'https://ipfs.io/ipfs/' + metadata.image.slice(7);

                    // Search for listing
                    fetchedTokens.push({ ...metadata, image: imageUrl, tokenID: i });
                }

                setTokens(fetchedTokens);
            };

            fetchMetadata();
        }
    }, [baseURI, balance]);

    let content: JSX.Element = <></>;
    if (isFetching) {
        content = (
            <ModalBody>
                <Flex justifyContent='center' alignItems='center' h='300px'>
                    <Spinner size='xl' />
                </Flex>
            </ModalBody>
        );
    } else if (!balance) {
        content = (
            <>
                <ModalBody>
                    <VStack>
                        <Text>You have no compatible ERC721 NFTs...</Text>
                        <Text>You can mint one for free <Link href='polygonscan.com' target='_blank'>here</Link>!</Text>
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <NextButton disabled />
                </ModalFooter>
            </>
        );
    } else if (balance) {
        content = (
            <>
                <ModalBody>
                    <VStack>
                        <Text>Showing <b>{balance}</b> compatible ERC721 attribute NFTs to list...</Text>
                        <SimpleGrid columns={2} gap='20px' pt='40px'>
                            {tokens.map(token => (
                                <NFTCard
                                    key={token.tokenID}
                                    {...token}
                                    onClick={() => setSelectedToken(token)}
                                    cursor='list-cursor.png'
                                    selected={selectedToken?.tokenID === token.tokenID}
                                />
                            ))}
                        </SimpleGrid>
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <NextButton disabled={!selectedToken} onClick={() => setIsTokenConfirmed(true)} />
                </ModalFooter>
            </>
        );
    }

    return content;
};

interface PricingProps {
    readonly setIsTokenConfirmed: any;
    readonly setIsListed: any;
    readonly token: NFTCardProps;
}

const Pricing: React.FC<PricingProps> = ({ setIsTokenConfirmed, setIsListed, token }) => {
    const [askPrice, setAskPrice] = useState('');
    const [sellerFundsRecipient, setSellerFundsRecipient] = useState('');
    const [findersFee, setFindersFee] = useState('');

    const { writeAsync } = useContractWrite({
        addressOrName: ZORA_ASKS_MUMBAI_ADDRESS,
        contractInterface: zoraAsksABI,
        functionName: 'createAsk',
        mode: 'recklesslyUnprepared',
        args: [
            ATTRIUM_NOUNS_BODY_ATTRIBUTE_ADDRESS,
            token.tokenID,
            +askPrice,
            MATIC_ADDRESS,
            sellerFundsRecipient,
            findersFee === '' ? 0 : +findersFee * 100
        ]
    });

    const createAsk = useCallback(async () => {
        await writeAsync();
        setIsListed(true);
        confetti({
            colors: ['#FF463E', '#FFCCCA', '#FF838B', '#FFFFFF'],
            particleCount: 400,
            startVelocity: 50,
            origin: { x: 0.5, y: 0 },
            drift: 0,
            angle: 270,
            spread: 270,
        });
    }, [writeAsync]);
    const goBack = useCallback(() => setIsTokenConfirmed(false), []);

    return (
        <>
            <ModalBody>
                <HStack alignItems='flex-start' spacing='20px'>
                    <NFTCard interactive={false} {...token} />
                    <VStack alignItems='flex-start' spacing='20px'>
                        <VStack spacing='0' alignItems='flex-start'>
                            <Text as='span' fontWeight='bold'>Ask Price</Text>
                            <Input required value={askPrice} onChange={(e) => setAskPrice(e.target.value)} placeholder='Ask Price (MATIC)' width='200px' />
                        </VStack>
                        <VStack spacing='0' alignItems='flex-start'>
                            <Text as='span' fontWeight='bold'>Seller Funds Recipient</Text>
                            <Input required value={sellerFundsRecipient} onChange={(e) => setSellerFundsRecipient(e.target.value)} placeholder='Wallet Address' width='200px' />
                        </VStack>
                        <VStack spacing='0' alignItems='flex-start'>
                            <Text as='span' fontWeight='bold'>Finders Fee</Text>
                            <Input value={findersFee} onChange={(e) => setFindersFee(e.target.value)} placeholder='Percentage (%)' width='200px' />
                        </VStack>
                    </VStack>
                </HStack>
            </ModalBody>
            <ModalFooter justifyContent='center' gap='20px'>
                <Button onClick={goBack}>Back</Button>
                <Button onClick={createAsk} disabled={!askPrice || !sellerFundsRecipient}>List</Button>
            </ModalFooter>
        </>
    );
};

interface ConfirmationProps {
    readonly token: NFTCardProps;
}

const Confirmation: React.FC<ConfirmationProps> = ({ token }) => {
    const { onClose } = useSellModal();

    return (
        <>
            <ModalBody>
                <VStack>
                    <Text>Congratulations on your listing!</Text>
                    <NFTCard interactive={false} {...token} />
                </VStack>
            </ModalBody>
            <ModalFooter justifyContent='center'>
                <Button onClick={onClose}>Done</Button>
            </ModalFooter>
        </>
    );
};

export const SellModal: React.FC<Pick<ModalProps, 'onClose'>> = ({ onClose }) => {
    const { isConnected } = useAccount();
    const [selectedToken, setSelectedToken] = useState<NFTCardProps | undefined>(undefined);
    const [isTokenConfirmed, setIsTokenConfirmed] = useState(false);
    const [isListed, setIsListed] = useState(false);

    let modalBody = <></>;
    if (!isConnected) {
        modalBody = <ColdStart />;
    } else if (!selectedToken || !isTokenConfirmed) {
        modalBody = (
            <NFTSelection
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
                setIsTokenConfirmed={setIsTokenConfirmed}
            />
        );
    } else if (!isListed) {
        modalBody = (
            <Pricing setIsTokenConfirmed={setIsTokenConfirmed} setIsListed={setIsListed} token={selectedToken} />
        );
    } else { // Token is listed
        modalBody = (
            <Confirmation token={selectedToken} />
        );
    }

    return (
        <Modal size='xl' isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sell</ModalHeader>
                <ModalCloseButton />
                {modalBody}
            </ModalContent>
        </Modal>
    );
};
