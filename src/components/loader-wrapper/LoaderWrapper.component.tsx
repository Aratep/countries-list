import React from "react";

// MUI ITEMS
import { CircularProgress } from "@mui/material";

type LoaderWrapperProps = {
  children: any;
  isLoading: boolean;
};
const LoaderWrapper = ({ children, isLoading }: LoaderWrapperProps) =>
  isLoading ? (
    <div className="loader-wrapper">
      <CircularProgress />
    </div>
  ) : (
    children
  );

export default LoaderWrapper;
