import React from "react";
import { withStateHandlers } from "recompose";
import { AppBar, Tabs, Tab } from "material-ui";
import styled from "react-emotion";

const tools = [
  process.env.REACT_APP_REDIS_URL,
  process.env.REACT_APP_MINIO_URL,
  process.env.REACT_APP_MONGODB_URL
];

const MainElement = styled("div")`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #eeeeee;
`;

const IFrame = styled("iframe")`
  position: absolute;
  top: 50px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  width: 100%;
  height: 100%;
`;

const App = ({ tabIndex, handleChange }) => (
  <MainElement>
    <AppBar position="static">
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Redis" />
        <Tab label="Minio" />
        <Tab label="MongoDB" />
      </Tabs>
    </AppBar>
    <IFrame title="tool" src={tools[tabIndex]} />
  </MainElement>
);

const enhance = withStateHandlers(
  { tabIndex: 0 },
  {
    handleChange: () => (event, tabIndex) => ({ tabIndex })
  }
);

export default enhance(App);
