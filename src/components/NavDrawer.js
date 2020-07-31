import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/core';

const NavDrawer = ({ children, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState('left');

  return (
    <div m={'auto'}>
      <Button variant="ghost" onClick={onOpen}>
        <Icon name="plus-square" size="24px" />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavDrawer;
