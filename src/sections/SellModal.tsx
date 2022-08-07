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
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NFTPreview } from '@zoralabs/nft-components';
import { NFTPreviewProps } from '@zoralabs/nft-components/dist/nft-preview/NFTPreview';
import { TokensQueryArgs, ZDK } from "@zoralabs/zdk";
import { Token } from '@zoralabs/zdk/dist/queries/queries-sdk';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ZORA_API_ENDPOINT } from '../constants';

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
    selectedToken: NFTPreviewProps | undefined;
    setSelectedToken: (token: NFTPreviewProps) => void;
    setIsTokenConfirmed: (value: boolean) => void;
}

const NFTSelection: React.FC<NFTSelectionProps> = ({
    selectedToken,
    setSelectedToken,
    setIsTokenConfirmed
}) => {
    const { address } = useAccount();
    const [tokens, setTokens] = useState<NFTPreviewProps[]>([]);

    useEffect(() => {
        const fetchUserNfts = async () => {
            const zdk = new ZDK({ endpoint: ZORA_API_ENDPOINT });

            const args: TokensQueryArgs = {
                where: { collectionAddresses: ['0xd9b78a2f1dafc8bb9c60961790d2beefebee56f4'], ownerAddresses: [address] },
                pagination: { limit: 50 }, // Optional, limits the response size to 3 NFTs
                includeFullDetails: false, // Optional, provides more data on the NFTs such as events
                includeSalesHistory: false // Optional, provides sales data on the NFTs
            };

            const response = await zdk.tokens(args);

            console.log(response);

            setTokens(response.tokens.nodes.map(node => ({
                contract: node.token.collectionAddress,
                id: node.token.tokenId
            })));
        };

        fetchUserNfts();
    }, []);

    console.log(tokens);

    return tokens.length === 0 ? (
        <>
            <ModalBody>
                <VStack>
                    <Text>You have no compatible ERC721 NFTs to list on Attrium...</Text>
                    <Text>You can mint one for free <Link href='polygonscan.com' target='_blank'>here</Link>!</Text>
                </VStack>
            </ModalBody>
            <ModalFooter justifyContent='center'>
                <NextButton disabled />
            </ModalFooter>
        </>
    ) : (
        <>
            <ModalBody>
                <VStack>
                    <Text>Showing <b>{tokens.length}</b> compatible ERC721 NFTs to list on Attrium...</Text>
                    <Flex wrap='wrap'>
                        {tokens.map(token => (
                            <NFTPreview
                                key={`${token.contract}${token.id}`}
                                {...token}
                                onClick={() => setSelectedToken(token)}
                                className={JSON.stringify(selectedToken) == JSON.stringify(token) ? 'selected-thumbnail' : undefined}
                            />
                        ))}
                    </Flex>
                </VStack>
            </ModalBody>
            <ModalFooter justifyContent='center'>
                <NextButton disabled={!selectedToken} onClick={() => setIsTokenConfirmed(true)} />
            </ModalFooter>
        </>
    );
};

interface PricingProps {
    readonly token: NFTPreviewProps;
}

const Pricing: React.FC<PricingProps> = ({ token }) => {
    const listAttribute = useCallback(() => setIsListed(), []);

    return (
        <>
            <ModalBody>
                <HStack>
                    <NFTPreview {...token} />
                    <Text>Pricing</Text>
                </HStack>
            </ModalBody>
            <ModalFooter justifyContent='center'>
                <Button onClick={listAttribute}>List</Button>
            </ModalFooter>
        </>
    );
};

const Confirmation: React.FC = () => {

    return (
        <></>
    );
};

export const SellModal: React.FC<Pick<ModalProps, 'onClose'>> = ({ onClose }) => {
    const { isConnected } = useAccount();
    const [selectedToken, setSelectedToken] = useState<NFTPreviewProps | undefined>(undefined);
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
            <Pricing token={selectedToken} />
        );
    } else { // Token is listed
        modalBody = (
            <Pricing token={selectedToken} />
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
