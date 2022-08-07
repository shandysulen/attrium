import { Alert, AlertDescription, AlertIcon, AlertProps, Button, HStack } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { navBarHeight, pagePaddingX } from '../constants';

export const SwitchNetworkBannerWrapper: React.FC = () => {
    const { isConnected } = useAccount();
    const { chain } = useNetwork();

    return isConnected && chain?.id !== 80001 && <SwitchNetworkBanner mt={navBarHeight} />;
};

const SwitchNetworkBanner: React.FC<AlertProps> = (props) => {
    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();

    const onClick = useCallback(() => switchNetworkAsync(80001), []);

    return (
        <Alert
            flexDir={{ base: 'column', md: 'row' }}
            status='warning'
            justifyContent='space-between'
            alignItems='center'
            px={pagePaddingX}
            {...props}
        >
            <HStack>
                <AlertIcon />
                <AlertDescription textAlign='left'>
                    You’re connected to the <b>{chain?.name}</b> network. Attrium is live on <b>Polygon Mumbai</b>.
                </AlertDescription>
            </HStack>
            <Button onClick={onClick}>Switch Network</Button>
        </Alert>
    );
};
