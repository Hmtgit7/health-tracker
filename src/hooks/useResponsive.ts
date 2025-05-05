"use client";

import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type ResponsiveValues = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  breakpoint: Breakpoint;
};

// Breakpoint sizes following Tailwind's default theme
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Custom hook for handling responsive design logic
 * Returns responsive values based on current screen size
 */
export const useResponsive = (): ResponsiveValues => {
  // Default to desktop values for SSR
  const [responsive, setResponsive] = useState<ResponsiveValues>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    breakpoint: "lg",
  });

  useEffect(() => {
    // Function to update responsive values
    const updateValues = () => {
      const width = window.innerWidth;

      let currentBreakpoint: Breakpoint = "xs";
      if (width >= breakpoints["2xl"]) currentBreakpoint = "2xl";
      else if (width >= breakpoints.xl) currentBreakpoint = "xl";
      else if (width >= breakpoints.lg) currentBreakpoint = "lg";
      else if (width >= breakpoints.md) currentBreakpoint = "md";
      else if (width >= breakpoints.sm) currentBreakpoint = "sm";

      setResponsive({
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg && width < breakpoints.xl,
        isLargeDesktop: width >= breakpoints.xl,
        breakpoint: currentBreakpoint,
      });
    };

    // Set initial values
    updateValues();

    // Add event listener for resize
    window.addEventListener("resize", updateValues);

    // Clean up
    return () => window.removeEventListener("resize", updateValues);
  }, []);

  return responsive;
};

/**
 * Helper function to get responsive values for any property
 * @param values - Object containing values for different breakpoints
 * @param currentBreakpoint - Current breakpoint
 * @returns The appropriate value for the current breakpoint
 */
export const getResponsiveValue = <T>(
  values: Partial<Record<Breakpoint, T>>,
  currentBreakpoint: Breakpoint
): T | undefined => {
  // Order of breakpoints from smallest to largest
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // Look for the closest defined breakpoint value
  for (let i = currentIndex; i >= 0; i--) {
    const breakpoint = breakpointOrder[i];
    if (values[breakpoint] !== undefined) {
      return values[breakpoint];
    }
  }

  // If no value is found, return undefined
  return undefined;
};

export default useResponsive;
