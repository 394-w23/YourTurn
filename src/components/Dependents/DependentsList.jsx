import { useEffect, useState } from "react";
import data from "../../utilities/Dependents.json";
import DependentCard from "./DependentCard";
import styles from "./DependentsList.module.css";
import { SimpleGrid, Container, createStyles, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDbData } from "../../utilities/firebase";

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

const DependentsList = ({ user, allUsers, allDependents }) => {
  console.log(user);
  console.log(allUsers);
  console.log(allDependents);

  const [allDeps, setAllDeps] = useState(allDependents);

  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }
  });

  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  const handleAddDependentClick = () => {
    navigate("/create-dependents-profile");
  };

  if (allDependents) {
    if (allDependents.length == 1) {
      return (
        <div>
          <Container>
            <Button
              fullWidth
              className={classes.button}
              onClick={handleAddDependentClick}
              color={theme.primaryColor}
            >
              <div className={classes.label}>Add Dependent</div>
            </Button>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            fullWidth
            className={classes.button}
            onClick={handleAddDependentClick}
            color={theme.primaryColor}
          >
            <div className={classes.label}>Add Dependent</div>
          </Button>
          <Container py="xl">
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
              {Object.entries(allUsers[user.uid]["dependents"]).map(
                ([id, dependentID]) => (
                  <DependentCard
                    key={id}
                    dependent={allDependents[dependentID]}
                  />
                )
              )}
            </SimpleGrid>
          </Container>
        </div>
      );
    }
  }
};

export default DependentsList;
