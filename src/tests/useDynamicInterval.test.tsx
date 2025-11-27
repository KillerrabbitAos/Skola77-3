import { renderHook } from "@testing-library/react";
import { useDynamicInterval } from "@/hooks";
import { act } from 'react';

type Step = [number, number]; 

// Disclaimer:  
// This is an integration test for the useDynamicInterval hook.
// It is not a unit test.
// That means I get cut some slack.
// Also it almost replicates the entire hook logic, making it more of a snapshot of the actual hook.
// As long as you don't change the test itself,
// you can be sure that the test will pass if the hook works.
// By the way of my competence
// ...and our mutal trust in chatGPT. 

jest.useFakeTimers();

describe("useDynamicInterval", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("should call the callback at the initial interval", () => {
    const callback = jest.fn();
    const steps: [number, number][] = [];
    renderHook(() => useDynamicInterval(callback, steps, 1000));

    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it("should update interval after reaching a step threshold", () => {
    const callback = jest.fn();
    const steps: [number, number][] = [[2, 500]];
    renderHook(() => useDynamicInterval(callback, steps, 1000));

    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it("should handle multiple step changes correctly", () => {
    const callback = jest.fn();
    const steps: [number, number][] = [
      [2, 800],
      [4, 400],
    ];
    renderHook(() => useDynamicInterval(callback, steps, 1000));

    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(callback).toHaveBeenCalledTimes(4);

    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it("cleans up on unmount", () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() =>
      useDynamicInterval(callback, [[2, 500]], 1000)
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    unmount();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
