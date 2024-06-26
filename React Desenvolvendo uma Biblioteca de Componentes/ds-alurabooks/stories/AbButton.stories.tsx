import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AbButton, AbButtonProps } from '../src';

export default {
  title: 'Components/AbButton',
  component: AbButton,
} as ComponentMeta<typeof AbButton>;

const Template: ComponentStory<typeof AbButton> = (props) => {
  return <AbButton {...props} />;
}

export const Primary = Template.bind({});

Primary.args = {
  text: 'Ab Primary Button',
  type: 'primary'
} as AbButtonProps;


export const Secondary = Template.bind({});

Secondary.args = {
  text: 'Ab Secondary Button',
  type: 'secondary'
} as AbButtonProps;