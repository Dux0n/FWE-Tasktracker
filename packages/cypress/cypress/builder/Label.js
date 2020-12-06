import { build, fake } from "test-data-bot";

export const labelBuilder = ({ }) =>
  build("Label").fields({
    name: fake(f => f.lorem.words()),
  });