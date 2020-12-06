import { build, fake } from "test-data-bot";

export const taskBuilder = ({ }) =>
  build("Transaction").fields({
    name: fake(f => f.lorem.words()),
    description: fake(f => f.lorem.words()),
  });
