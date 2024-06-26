import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AbCard, AbCardProps } from '../src';

export default {
  title: 'Components/AbCard',
  component: AbCard,
} as ComponentMeta<typeof AbCard>;

const Template: ComponentStory<typeof AbCard> = (props) => {
  return <AbCard {...props} />;
}

export const Default = Template.bind({});

Default.args = {
  children: <h1>Olá, eu sou um card</h1>
} as AbCardProps;