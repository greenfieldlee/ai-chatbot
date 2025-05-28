"use client";
import { styled, Box } from "@mui/material";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialize } from '@/redux/slices/bot';
import Header from "@/app/(Layout)/layout/header/Header";
import Footer from "@/app/(Layout)/layout/footer/Footer";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  padding: 0
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  padding: 0
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 127px)",
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: "calc(100vh - 115.38px)",
  }
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { ready } = useSelector(
    (state: any) => state.bot
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    dispatch(getInitialize(token) as any);
  }, []);

  if(ready === false) {
    return <></>;
  }

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header />
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <BoxWrapper>{children}</BoxWrapper>
        {/* ------------------------------------------- */}
        {/* Footer */}
        {/* ------------------------------------------- */}
        <Footer />
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
}
