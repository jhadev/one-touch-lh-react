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
  Link,
  Checkbox,
  CheckboxGroup,
  Spinner,
} from '@chakra-ui/core';
import ReportViewer from 'react-lighthouse-viewer';
import ToggleColorMode from './ToggleColorMode';
import NavDrawer from './NavDrawer';
import { siteList } from '../utils/siteList';
import { client } from '../utils/API';

const Layout = (props) => {
  const [checkedItems, setCheckedItems] = useState(siteList);
  const [stats, setStats] = useState(null);
  const [jsonReports, setjsonReports] = useState([]);

  useEffect(() => {
    async function getStats() {
      try {
        const data = await client('api/summary');

        setStats(data);
      } catch (err) {
        console.log(err);
      }
    }

    getStats();
  }, []);

  useEffect(() => {
    async function getJsonReports() {
      try {
        let data = await client('api/json-reports');
        console.log(data.length);
        setjsonReports(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (stats) {
      getJsonReports();
    }
  }, [stats]);

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
    const sitesToTest = checkedItems
      .filter((site) => site.checked)
      .map((site) => site.url);

    console.log(sitesToTest);
    if (!sitesToTest.length) {
      return alert('no tests selected');
    }
    setStats(null);
    const response = await postToLH(sitesToTest);
    console.log(response);

    setStats(response);
  };

  const writeStats = () => {
    const { summary, path } = stats;

    if (summary.length) {
      const results = summary.map((site) => {
        return {
          url: site.url,
          name: site.name,
          score: site.detail.performance * 100,
        };
      });

      return (
        <div>
          {results.map(({ url, name, score }) => {
            return (
              <div key={url}>
                <h4>{name}</h4>
                <h4>{url}</h4>
                <h4>{score}</h4>
              </div>
            );
          })}
        </div>
      );
    }
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
      <Flex my={3} direction="column" justify="center">
        {stats ? (
          <>
            <Flex direction="row" justify="center">
              <pre>
                <code>{JSON.stringify(stats, null, 2)}</code>
              </pre>

              {jsonReports.length &&
                jsonReports.map((report, i) => (
                  <Fragment key={i}>
                    <ReportViewer json={report} />
                  </Fragment>
                ))}
            </Flex>
          </>
        ) : (
          <>
            <Heading textAlign="center" m={1} as="h2" size="xl">
              waiting... be patient
            </Heading>
            <Spinner
              my={5}
              thickness="4px"
              speed="1s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </>
        )}
      </Flex>
    </div>
  );
};

export default Layout;
