import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CrimeListView from "./CrimeListView";

export default ({ state, allInfo }) => (
  <Tabs>
    <TabList>
      <Tab>CrimeListAgainst - Female</Tab>      
    </TabList>
    <TabPanel>
      <h2>All Crime List - [2001 -2021]</h2>
      <CrimeListView state={state} />
    </TabPanel>    
  </Tabs>
);
