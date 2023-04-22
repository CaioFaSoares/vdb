import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { MenuItems, MenuItem, MenuButton } from '@/components';
import Gem from '@/assets/images/icons/gem.svg';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg';
import ClockHistory from '@/assets/images/icons/clock-history.svg';
import LightbulbFill from '@/assets/images/icons/lightbulb-fill.svg';

const TwdMoreButton = ({ noText }) => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="More interesting stuff"
        icon={<Gem />}
        text={noText ? null : 'More'}
      />
      <MenuItems>
        <MenuItem onClick={() => navigate('/twd/hall_of_fame/tournaments')}>
          <div className="flex items-center gap-2">
            <TrophyFill />
            Hall Of Fame - Tournaments
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate('/twd/hall_of_fame/cards')}>
          <div className="flex items-center gap-2">
            <LightbulbFill />
            Hall Of Fame - Cards Appearance
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate('/twd/cards_history')}>
          <div className="flex items-center gap-2">
            <ClockHistory />
            Cards Appearance History
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default TwdMoreButton;
