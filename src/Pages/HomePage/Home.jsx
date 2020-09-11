import React from "react";
import {
  Segment,
  Container,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

const HomePage = ({ history }) => (
  <Segment   inverted textAlign="center" vertical className="home">
    <Container style={{marginTop: '25em'}}>
      <Header as="h1" inverted >
        <Image
          size="massive"
          src="/assets/logo.png"
          style={{ marginBottom: 12 }}
        />
        Hangout Club
      </Header>
      <Button onClick={() => history.push("/event")} size="huge" inverted>
        Get Started
        <Icon name="right arrow" inverted />
      </Button>
    </Container>
  </Segment>
);

export default HomePage;
