/**
 * @vitest-environment jsdom
 */
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest"; // Add afterEach
import StarRating from "../src/components/StarRating";
import "@testing-library/jest-dom/vitest";

describe("StarRating Component", () => {
  // Add this block right here:
  afterEach(() => {
    cleanup();
  });

  it("should render the correct number of stars based on numStar prop", () => {
    const numStar = 7;
    render(<StarRating numStar={numStar} />);

    // SVGs from react-icons usually don't have a role,
    // but we can find them by their container's children or adding a data-testid
    const stars = screen.getAllByTestId("star-icon");
    expect(stars).toHaveLength(numStar);
  });

  it("should start with all stars having the gray color class", () => {
    render(<StarRating numStar={5} />);
    const stars = screen.getAllByTestId("star-icon");
    stars.forEach((star) => {
      expect(star).toHaveClass("text-gray-300");
    });
  });

  it("should change star colors when a star is clicked", () => {
    render(<StarRating numStar={5} />);
    const stars = screen.getAllByTestId("star-icon");
    // Click the 3rd star
    fireEvent.click(stars[2]);

    // First 3 stars should be yellow
    expect(stars[0]).toHaveClass("text-yellow-400");
    expect(stars[1]).toHaveClass("text-yellow-400");
    expect(stars[2]).toHaveClass("text-yellow-400");

    // 4th and 5th stars should remain gray
    expect(stars[3]).toHaveClass("text-gray-300");
    expect(stars[4]).toHaveClass("text-gray-300");
  });

  it("should highlight stars on hover and revert on mouse leave", async () => {
    // Note the 'async' here
    render(<StarRating numStar={5} />);
    const stars = screen.getAllByTestId("star-icon");

    // Hover over the 4th star
    fireEvent.mouseEnter(stars[3]);
    expect(stars[3]).toHaveClass("text-yellow-400");

    // Leave the star
    fireEvent.mouseLeave(stars[3]);

    // Wait for the state update to apply the gray class
    await waitFor(() => {
      stars.forEach((star) => {
        expect(star).toHaveClass("text-gray-300");
      });
    });
  });

  it("should maintain clicked rating even after hovering over other stars", () => {
    render(<StarRating numStar={5} />);
    const stars = screen.getAllByTestId("star-icon");

    // 1. Click the 2nd star (Rating = 2)
    fireEvent.click(stars[1]);

    // 2. Hover over the 5th star
    fireEvent.mouseEnter(stars[4]);

    // 3. (Optional) Check if 5th star is yellow during hover
    expect(stars[4]).toHaveClass("text-yellow-400");

    // 4. Leave the 5th star
    fireEvent.mouseLeave(stars[4]);

    // 5. THE IMPORTANT PART:
    // After mouse leave, the 2nd star should STILL be yellow
    // but the 5th star should be gray again.
    expect(stars[1]).toHaveClass("text-yellow-400");
    expect(stars[4]).toHaveClass("text-gray-300");
  });
});
