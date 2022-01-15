import { Story as StoryType } from "@storybook/react";

export const WidthDecorator =
  (width: number | string) =>
  (Story: StoryType): JSX.Element =>
    (
      <div style={{ width }}>
        <Story />
      </div>
    );
