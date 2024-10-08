import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HeaderSub from "../Home/HeaderSub";
import ProductTable from "./ProductTable";
import NutrientsTable from "./NutrientsTable";
import CategoryTable from "./CategoryTable";
import RecordTable from "./RecordTable";
import UserTable from "./UserTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}>
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
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

export default function HorizontalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <HeaderSub />
      <div style={{ marginTop: "6rem" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            height: 600, // Adjusted height
          }}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Horizontal tabs example"
            sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tab label="Products" {...a11yProps(0)} />
            <Tab label="Nutrients" {...a11yProps(1)} />
            <Tab label="Categories" {...a11yProps(2)} />
            <Tab label="Records" {...a11yProps(3)} />
            <Tab label="Users" {...a11yProps(4)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ProductTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NutrientsTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CategoryTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <RecordTable />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <UserTable />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
