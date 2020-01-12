import React from 'react';
import styles from './Landing.module.scss';
import {Border} from "../../components/Border/Border";
import {LinkButton} from "../../components/LinkButton/LinkButton";

export const Landing = () => {
  const link = 'https://sydney.edu.au/science/our-research/research-areas/life-and-environmental-sciences/animal-behaviour-lab.html';

  return (
    <Border>
    <div className={styles.Background}>
      <div className={styles.Title}>
        <h1>Goby Game</h1>
        <h4>
          This fish is a Goby. They use camouflage to blend into their background! While this background-blending is
          great when it comes to avoiding detection by deadly predators, it doesn't help much when they need to move around to find food
          or mates. Our lab at the <a href={link}>University of Sydney</a> is trying to understand how these
          fish balance the need to move against the need to stay still. If you want to help us, try our game! You'll
          play the part of the predator searching for a yummy goby meal.
        </h4>
      </div>

      <LinkButton to="/demo">
        Play
      </LinkButton>
    </div>
    </Border>
  );
};
