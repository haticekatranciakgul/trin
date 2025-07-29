import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `custom-tab-${index}`,
    'aria-controls': `custom-tabpanel-${index}`,
  };
}

const CustomTabs = ({ tabs, tabContents, sx }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="custom tabs"
        sx={{
          minHeight: 40,
          mb: 2,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            minHeight: 40,
          },
        }}
        TabIndicatorProps={{ children: <span /> }}
      >
        {tabs.map((tab, idx) => (
          <Tab key={tab} label={tab} {...a11yProps(idx)} disableRipple />
        ))}
      </Tabs>
      {tabContents.map((content, idx) => (
        <CustomTabPanel key={idx} value={value} index={idx}>
          {content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabContents: PropTypes.arrayOf(PropTypes.node).isRequired,
  sx: PropTypes.object,
};

export default CustomTabs; 