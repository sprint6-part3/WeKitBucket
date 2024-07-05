import { useMediaQuery } from "react-responsive";

interface Responsive {
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

function useResponsive(): Responsive {
  const isPc = useMediaQuery({ query: "(min-width: 1280px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return { isPc, isTablet, isMobile };
}

export default useResponsive;
