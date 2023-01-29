import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableCloudiness from "components/criteria/TableCloudiness";
import TablePrecipitation from "components/criteria/TablePrecipitation";
import TableWindDirection from "components/criteria/TableWindDiriction";
import TableWindSpeed from "components/criteria/TableWindSpeed";
import TableTemperature from "components/criteria/TableTemperature";
import ExplainCloudiness from "components/criteria/ExplainCloudiness";
import ExplainPrecipitation from "components/criteria/ExplainPrecipitation";
import ExplainTemperature from "components/criteria/ExplainTemperature";
import ExplainWindDirection from "components/criteria/ExplainWindDirection";
import ExplainWindSpeed from "components/criteria/ExplainWindSpeed";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CriteriaTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="container">
      <Box className="title">채점기준 및 채점표</Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Criteria tab"
          centered
        >
          <Tab label="운량" {...a11yProps(0)} />
          <Tab label="풍향" {...a11yProps(1)} />
          <Tab label="풍속" {...a11yProps(2)} />
          <Tab label="기온" {...a11yProps(3)} />
          <Tab label="강수량" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ExplainCloudiness />
        <TableCloudiness />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExplainWindDirection />
        <TableWindDirection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ExplainWindSpeed />
        <TableWindSpeed />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ExplainTemperature />
        <TableTemperature />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ExplainPrecipitation />
        <TablePrecipitation />
      </TabPanel>
    </Box>
  );
}

export default CriteriaTabs;
