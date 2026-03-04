import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import NavItem from './NavItem';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import DownOutlined from '@ant-design/icons/DownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

export default function NavCollapse({ item, level }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />
  ) : null;

  // Check if any child URL matches current path - auto expand
  useEffect(() => {
    if (item.children) {
      const hasActiveChild = item.children.some((child) => {
        if (child.type === 'item' && child.url) {
          return !!matchPath({ path: child.url, end: false }, pathname);
        }
        return false;
      });
      setOpen(hasActiveChild);
    }
  }, [pathname, item.children]);

  const handleToggle = () => {
    setOpen(!open);
    if (downLG) handlerDrawerOpen(false);
  };

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  // Check if parent should show as selected (when child is active)
  const isChildSelected = item.children?.some((child) => {
    if (child.type === 'item' && child.url) {
      return !!matchPath({ path: child.url, end: false }, pathname);
    }
    return false;
  });

  return (
    <>
      <ListItemButton
        disabled={item.disabled}
        onClick={handleToggle}
        selected={isChildSelected}
        sx={(theme) => ({
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': { bgcolor: 'primary.lighter' },
            '&.Mui-selected': {
              bgcolor: 'transparent',
              '&:hover': { bgcolor: 'primary.lighter' }
            },
            ...(isChildSelected && {
              '& .MuiListItemIcon-root': { color: iconSelectedColor },
              '& .MuiTypography-root': { color: iconSelectedColor }
            })
          }),
          ...(!drawerOpen && {
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
          })
        })}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isChildSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': { bgcolor: 'secondary.lighter' }
              }),
              ...(!drawerOpen &&
                isChildSelected && {
                  bgcolor: 'primary.lighter',
                  '&:hover': { bgcolor: 'primary.lighter' }
                })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: isChildSelected ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            {open ? (
              <DownOutlined style={{ fontSize: '0.75rem' }} />
            ) : (
              <RightOutlined style={{ fontSize: '0.75rem' }} />
            )}
          </Box>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ py: 0 }}>
          {item.children?.map((menuItem) => {
            switch (menuItem.type) {
              case 'item':
                return (
                  <NavItem
                    key={menuItem.id}
                    item={menuItem}
                    level={level + 1}
                  />
                );
              default:
                return null;
            }
          })}
        </List>
      </Collapse>
    </>
  );
}

NavCollapse.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};
