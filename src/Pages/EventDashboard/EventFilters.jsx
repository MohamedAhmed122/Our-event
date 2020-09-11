import React from "react";
import { Menu, Header, Responsive } from "semantic-ui-react";
import Calendar from "react-calendar";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const FilterEvent = ({ setPredicate, predicate, loading }) => {
  const {isAuthenticated} = useSelector(state =>  state.auth)
  return (
    <Fragment>
      {
        isAuthenticated &&
        <Responsive as={Menu} minWidth={798} vertical size="large" style={{ width: "100%" }}>
          <Header icon="filter" attached color="teal" content="Filter" />
          <Menu.Item
            content="All Events"
            active={predicate.get("filter") === "all"}
            onClick={() => setPredicate("filter", "all")}
            disabled={loading}
          />
          <Menu.Item
            content="I'm going"
            active={predicate.get("filter") === "isGoing"}
            onClick={() => setPredicate("filter", "isGoing")}
            disabled={loading}
          />
          <Menu.Item
            content="I'm Hosting"
            active={predicate.get("filter") === "isHost"}
            onClick={() => setPredicate("filter", "isHost")}
            disabled={loading}
          />
      </Responsive>
      }
      
      <Responsive as={Header} minWidth={798}  icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date) => setPredicate("startDate", date)}
        value={predicate.get("startDate" || new Date())}
        tileDisabled={() => loading}
      />
    </Fragment>
  );
};
export default FilterEvent;
