import { render, screen } from "@testing-library/react";

import { ModalSheetGrayContainer, ModalSheetGrayContainerProps } from ".";

const setup = (overrideProps?: Partial<ModalSheetGrayContainerProps>) => {
  render(
    <ModalSheetGrayContainer {...overrideProps}>test</ModalSheetGrayContainer>
  );
};

describe("ModalSheetGrayContainer", () => {
  it("should render children", () => {
    setup();

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
