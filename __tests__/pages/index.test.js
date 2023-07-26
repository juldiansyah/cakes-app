import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import { DEFAULT_CAKE_FIELDS } from "@/constants";
import { useAppSelector } from "@/hooks";

jest.mock("../../hooks");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    const initialState = {
      cakes: {
        cakes: {
          current_page: 1,
          total_page: 1,
          items: [],
        },
        selectedCake: DEFAULT_CAKE_FIELDS,
      },
    };
    const testUseSelector = (f) => f(initialState);
    useAppSelector.mockImplementation(testUseSelector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders home page", () => {
    render(<Home />);

    expect(screen.getByText(/Cake List/i)).toBeInTheDocument();
  });
});
