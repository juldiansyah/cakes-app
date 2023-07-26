import { render, screen } from "@testing-library/react";
import Modal from "@/components/Modal";

describe("Modal", () => {
  it("renders Modal", () => {
    const PROPS = {
      title: "Showing Modal",
      onCancel: jest.fn(),
      cancelText: "Cancel",
      onProceed: jest.fn(),
      proceedText: "Save",
    };
    render(<Modal {...PROPS} />);

    expect(screen.getByText(/Showing Modal/i)).toBeInTheDocument();
  });
});
