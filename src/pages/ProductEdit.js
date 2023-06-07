import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ProductDetailEdit from '../components/products/productDetailEdit';
import ImageDetailEdit from '../components/products/imageDetailEdit';

function ProductEdit() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Product Detail" value="1" />
            <Tab label="Image Detail" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProductDetailEdit />
        </TabPanel>
        <TabPanel value="2">
          <ImageDetailEdit />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default ProductEdit;
