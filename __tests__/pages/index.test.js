import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import Home from "@/pages/index";
import { DEFAULT_CAKE_FIELDS } from "@/constants";
import { useAppSelector } from "@/hooks";

jest.mock("../../hooks");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const server = setupServer(
  rest.get(
    "https://611a268fcbf1b30017eb5527.mockapi.io/cakes",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          response: {
            data: {
              current_page: "1",
              total_page: "1",
              items: [
                {
                  title: "Handmade Metal Towels",
                  description:
                    "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
                  rating: 50,
                  image: "https://loremflickr.com/640/480",
                  created_at: "2023-07-24T18:43:28.486Z",
                  updated_at: "2024-01-29T03:47:35.257Z",
                  id: "43",
                },
              ],
            },
          },
        })
      );
    }
  )
);

describe("Home", () => {
  beforeAll(() => server.listen());

  afterAll(() => server.close());

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
    server.resetHandlers();
    jest.clearAllMocks();
  });

  it("renders home page", () => {
    render(<Home />);

    expect(screen.getByText(/Cake List/i)).toBeInTheDocument();
  });

  it("click on next page", async () => {
    const { getByTestId } = render(<Home />);
    fireEvent.click(getByTestId("next-button"));
    expect(
      screen.getByText(
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit"
      )
    ).toBeInTheDocument();
  });
});
