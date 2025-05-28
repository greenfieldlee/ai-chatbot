import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AppBarStyled = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  backgroundColor: '#f9fafb',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderColor: '#edf2f7',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0.7rem',
    paddingBottom: '0.7rem',
  }
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0!important',
  gap: '0.375rem',
  [theme.breakpoints.down('md')]: {
    minHeight: '0px!important'
  }
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: 'rgb(152, 161, 178)',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  fontWeight: 500,
  [theme.breakpoints.down('md')]: {
  }
}));

const TypographyBoldStyled = styled('a')(({ theme }) => ({
  color: '#1f1f1f',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  fontWeight: 800,
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
  }
}));

const IconStyled = styled('img')(({ theme }) => ({
  width: '20px',
  height: '20px',
  [theme.breakpoints.down('md')]: {
    width: '15px',
    height: '15px',
  }
}));

const Header = () => {

  return (
    <AppBarStyled color="default">
      <BoxStyled>
        <TypographyStyled>Powered by</TypographyStyled>
        <Box display="flex" alignItems="center" gap="3px">
          <IconStyled src="/images/bot-icon.png" />
          <TypographyBoldStyled href="https://www.askiot.ai" target="_blank">askIot.ai</TypographyBoldStyled>
        </Box>
      </BoxStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
