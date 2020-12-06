import { build, fake } from "test-data-bot";

export const trackingBuilder = ({ }) =>
  build("Tracking").fields({
    description: fake(f => f.lorem.words()),
  });