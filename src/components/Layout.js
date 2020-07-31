import React, { useState, useEffect, Fragment } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  Radio,
  RadioGroup,
  Image,
  Heading,
  SimpleGrid,
  Stack,
  Link,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/core';
import ToggleColorMode from './ToggleColorMode';
import NavDrawer from './NavDrawer';
import { siteList } from '../utils/siteList';

const Layout = (props) => {
  const [checkedItems, setCheckedItems] = useState(siteList);

  const handleCheckedItems = (e) => {
    const { name } = e.target;

    const updatedList = checkedItems.filter((item) => {
      if (name === item.name) {
        item.checked = !item.checked;
      }

      return item;
    });

    setCheckedItems(updatedList);
  };

  const handleSubmit = () => {
    const sitesToTest = checkedItems
      .filter((site) => site.checked)
      .map((site) => site.url);

    console.log(sitesToTest);
  };

  return (
    <div>
      <NavDrawer title="one touch lighthouse">
        <ToggleColorMode />
        <CheckboxGroup variantColor="pink">
          {siteList.map((site) => {
            return (
              <Fragment key={site.url}>
                <Checkbox
                  onChange={handleCheckedItems}
                  name={site.name}
                  value={site.url}>
                  {site.name}
                </Checkbox>
              </Fragment>
            );
          })}
        </CheckboxGroup>
        <Flex my={5} justify="left" wrap="wrap">
          <Flex align="center" direction="column">
            <Button
              p={3}
              variantColor="pink"
              height="100%"
              rounded="lg"
              fontSize="xl"
              width="100%"
              mx="auto"
              mb={2}
              onClick={handleSubmit}>
              {'    '}
              RUN!{'    '}
            </Button>
          </Flex>
        </Flex>
      </NavDrawer>
      <Heading textAlign="center" m={1} as="h1" size="2xl">
        one touch lighthouse
      </Heading>
    </div>
  );
};

export default Layout;
