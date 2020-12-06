import { build, fake } from "test-data-bot";

export const taskBuilder = ({ }) =>
  build("Task").fields({
    name: fake(f => f.lorem.words()),
    description: fake(f => f.lorem.words()),
  });
