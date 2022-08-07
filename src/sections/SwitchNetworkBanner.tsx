import { Alert, AlertDescription, AlertIcon, AlertProps, Button, HStack } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { pagePaddingX } from '../constants';

export const SwitchNetworkBanner: React.FC<AlertProps> = (props) => {
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
