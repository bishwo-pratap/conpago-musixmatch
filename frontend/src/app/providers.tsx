'use client'

import theme from './theme';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';
import makeStore from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { store, persistor } = makeStore();
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
    </ChakraProvider>
  );
}
