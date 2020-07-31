import React, { useState, useEffect, Fragment, Suspense } from 'react';
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
import { client } from '../utils/API';

const Layout = (props) => {
  const [checkedItems, setCheckedItems] = useState(siteList);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function getSummary() {
      try {
        const data = await client('api/summary');
        setSummary(data);
      } catch (err) {
        console.log(err);
      }
    }

    getSummary();
  }, []);

  const postToLH = async (sites) => {
    try {
      return await client('api/lh', { body: { sites } });
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleSubmit = async () => {
    setSummary(null);
    const sitesToTest = checkedItems
      .filter((site) => site.checked)
      .map((site) => site.url);

    console.log(sitesToTest);
    const response = await postToLH(sitesToTest);
    console.log(response);

    setSummary(response);
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
      <Flex my={3} align="center" direction="column">
        {summary ? (
          <pre>
            <code>{JSON.stringify(summary, null, 2)}</code>
          </pre>
        ) : (
          <Heading textAlign="center" m={1} as="h2" size="xl">
            waiting... be patient
          </Heading>
        )}
      </Flex>
    </div>
  );
};

export default Layout;
