import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AbTextField, AbTextFieldProps } from '../src';

export default {
  title: 'Components/AbTextField',
  component: AbTextField,
  argTypes: {
    label: {
      control: 'text'
    }
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof AbTextField>;

const Template: ComponentStory<typeof AbTextField> = (props) => {
  return <AbTextField {...props} />;
}

export const Default = Template.bind({});

Default.args = {
  label: 'Email'
} as AbTextFieldProps;