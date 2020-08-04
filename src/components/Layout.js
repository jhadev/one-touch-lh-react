import React, { useState, useEffect, Fragment, Suspense } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  Image,
  Heading,
  SimpleGrid,
  Stack,
  Checkbox,
  CheckboxGroup,
  Spinner,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import ReportViewer from 'react-lighthouse-viewer';
import ToggleColorMode from './ToggleColorMode';
import NavDrawer from './NavDrawer';
import { useGlobalState } from '../components/Global';
import { siteList } from '../utils/siteList';
import { client } from '../utils/API';

const Layout = (props) => {
  const [{ checkedItems, stats, jsonReports }, dispatch] = useGlobalState();

  useEffect(() => {
    async function getStats() {
      try {
        const data = await client('api/summary');

        dispatch({ type: 'SET_STATS', stats: data });
      } catch (err) {
        console.log(err);
      }
    }

    getStats();
  }, [dispatch]);

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

    dispatch({ type: 'SET_CHECKED_ITEMS', checkedItems: updatedList });
  };

  const handleSubmit = async () => {
    const sitesToTest = checkedItems
      .filter((site) => site.checked)
      .map((site) => site.url);

    console.log(sitesToTest);
    if (!sitesToTest.length) {
      return alert('no tests selected');
    }
    dispatch({ type: 'SET_STATS', stats: null });
    const response = await postToLH(sitesToTest);
    console.log(response);

    dispatch({ type: 'SET_STATS', stats: response });
  };

  // const writeStats = () => {
  //   const { summary, path } = stats;

  //   if (summary.length) {
  //     const results = summary.map((site) => {
  //       return {
  //         url: site.url,
  //         name: site.name,
  //         score: site.detail.performance * 100,
  //       };
  //     });

  //     return (
  //       <div>
  //         {results.map(({ url, name, score }) => {
  //           return (
  //             <div key={url}>
  //               <h4>{name}</h4>
  //               <h4>{url}</h4>
  //               <h4>{score}</h4>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   }
  // };

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
      <Flex my={3} direction="row" justify="center">
        {stats ? (
          <div>
            <Flex direction="column" justify="center" align="center">
              {stats.summary.map(({ url }) => {
                url = url.slice(8);
                return (
                  <div key={url}>
                    <Link to={`/${url}`}>{url}</Link>
                  </div>
                );
              })}
            </Flex>
            <Flex direction="column" justify="center" align="center">
              <pre>
                <code>{JSON.stringify(stats, null, 2)}</code>
              </pre>
            </Flex>
          </div>
        ) : (
          <Flex justify="center" align="center" direction="column">
            <Heading textAlign="center" m={1} as="h2" size="xl">
              waiting... be patient
            </Heading>
            <div>
              <Spinner
                my={5}
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Layout;
