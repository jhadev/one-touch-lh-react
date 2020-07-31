import React from 'react';
import { Button, useColorMode, Icon } from '@chakra-ui/core';

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button
        variantColor="pink"
        variant={'ghost'}
        width="100%"
        mt={1}
        onClick={toggleColorMode}>
        {colorMode === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
      </Button>
    </header>
  );
};

export default ToggleColorMode;
