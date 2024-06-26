import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AbTag, AbTagProps } from '../src';

export default {
  title: 'Components/AbTag',
  component: AbTag,
} as ComponentMeta<typeof AbTag>;

const Template: ComponentStory<typeof AbTag> = (props) => {
  return <AbTag {...props} />;
}

export const Default = Template.bind({});

Default.args = {
  text: 'React'
} as AbTagProps;