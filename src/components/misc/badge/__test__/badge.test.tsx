import { render } from "@testing-library/react";
import UserBadge from "../badge";

test("Badge", () => {
  render(<UserBadge badge="premium" />);
});
