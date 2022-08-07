import { createContext, useContext, } from 'react';

export const SellModalContext = createContext({
    isOpen: false,
    onOpen: () => { },
    onClose: () => { }
});

export const useSellModal = () => {
    const context = useContext(SellModalContext);

    return context;
};