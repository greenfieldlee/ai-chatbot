import React, { useState, useEffect } from 'react';
import { Box, AppBar, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialize } from '@/redux/slices/bot';
import PropTypes from 'prop-types';
import './header.css';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  padding: '25px 45px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '119px',
  background: '#3662E3',
  [theme.breakpoints.down('md')]: {
    padding: '27px 40px',
    gap: '59px',
  }
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0!important',
  [theme.breakpoints.down('md')]: {
    minHeight: '0px!important'
  }
}));

const StatusWrapStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '9px',
  padding: '0!important'
}));

const ControlWrapStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '0!important'
}));

const RowStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '9px',
  [theme.breakpoints.down('md')]: {
    gap: '5px',
  }
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: '#FFF',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '28px',
  [theme.breakpoints.down('md')]: {
    fontSize: '17px',
    lineHeight: '18px',
  }
}));

const Header = () => {
  const dispatch = useDispatch();

  const { setting } = useSelector(
    (state: any) => state.bot
  );

  return (
    <AppBarStyled position="sticky" color="default" style={{
      backgroundColor: setting.primaryColor === undefined ? "#3662E3" : setting.primaryColor
    }}>
      <BoxStyled>
        <StatusWrapStyled>
          <RowStyled>
            <TypographyStyled>{setting.name === undefined ? "Bot" : setting.name}</TypographyStyled>
          </RowStyled>
        </StatusWrapStyled>
        <ControlWrapStyled>
          {/* <BtnStyled src="/images/rotate.png" onClick={onRefresh}/>
          <BtnStyled src="/images/profile.png" />
          <BtnStyled src="/images/sound.png" /> */}
          {/* <BtnStyled src="/images/x-mark.png" /> */}
        </ControlWrapStyled>
      </BoxStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
