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
  const [checkedItems, setCheckedItems] = useState([]);

  return (
    <div>
      <NavDrawer title="one touch lighthouse">
        <ToggleColorMode />
        <CheckboxGroup onChangevariantColor="pink">
          {siteList.map((site) => {
            return (
              <Fragment key={site.url}>
                <Checkbox
                  value={site.url}
                  onChange={(e) =>
                    setCheckedItems([...checkedItems, e.target.value])
                  }>
                  {site.name}
                </Checkbox>
              </Fragment>
            );
          })}
        </CheckboxGroup>
      </NavDrawer>
    </div>
  );
};

export default Layout;
