import { React, useEffect, useState } from "react";
// import clients from "../../utilities/clients.json";
import ClientCard from "./ClientCard";
import { Box, Container, createStyles, Grid, Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import emptyState from "../../images/empty_state3.png";

const useStyles = createStyles(() => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
    width: "150px",
    margin: "auto",
  },
  label: {
    position: "relative",
    zIndex: 1,
  },
}));

const ClientsList = ({ user, allUsers, allDependents }) => {
  const { classes, theme } = useStyles();
  const isMobile = useMediaQuery("(max-width:850px)");
  const [allDeps, setAllDeps] = useState(allDependents);

  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }
  });

  if (
    allDeps == null ||
    allDeps.length == 1 ||
    allUsers[user.uid]["clients"] == null
  ) {
    return (
      <Container
        fluid
        style={{
          backgroundColor: "#EEE1C4",
          height: "100%",
          minHeight: "calc(100vh - 0px)",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={emptyState}
            height={300}
            width={300}
            fit="contain"
            alt="No dependent"
          />
          <Text fz="xl" fw={500}>
            You have no client...
          </Text>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container
        fluid
        style={{
          backgroundColor: "#EEE1C4",
          height: "100%",
          minHeight: "calc(100vh - 0px)",
        }}
      >
        <Container py="xl">
          <Grid>
            {Object.entries(allUsers[user.uid].clients).map(([id, client]) => {
              return (
                <Grid.Col span={isMobile ? 12 : 6} key={id}>
                  <ClientCard
                    key={id}
                    client={allDependents[client.id]}
                    permissions={client.permissions}
                    creator={allUsers[allDependents[client.id].creator]}
                    currentUser={allUsers[user.uid]}
                    isOnHomePage={false}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </Container>
    );
  }
};

export default ClientsList;
