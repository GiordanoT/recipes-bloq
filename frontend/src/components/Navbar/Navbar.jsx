import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem
} from '@mui/material';
import {MenuRounded} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../data/api';
import {logout} from '../../redux/slices/auth';

export function Navbar() {
    let pages;
    let settings;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth);
    if(user) {
        pages = ['home', 'add Recipe', 'my Recipes', 'my Menus', 'favorites'];
        settings = ['logout'];
    } else {
        pages = ['home'];
        settings = ['login', 'register'];
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenNavMenu = e => setAnchorElNav(e.currentTarget);
    const handleOpenUserMenu = e => setAnchorElUser(e.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (<AppBar sx={{background: 'whitesmoke'}} position='static'>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Typography variant='h6' noWrap component='a'
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <img src={'images/logo.png'} alt={'Logo'} />
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleOpenNavMenu}
                        color='inherit'
                    >
                        <MenuRounded sx={{color: 'black'}} />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorElNav}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'left'}}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{display: {xs: 'block', md: 'none'}}}
                    >
                        {pages.map(page => <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography onClick={e => navigate('/' + page.replace(' ', ''))}
                                        textAlign='center'>
                                {page[0].toUpperCase() + page.substring(1)}
                            </Typography>
                        </MenuItem>)}
                    </Menu>
                </Box>
                <Typography
                    variant='h5'
                    noWrap
                    component='a'
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <img src={'images/logo.png'} alt={'Logo'} />
                </Typography>
                <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map(page => <Button
                        key={page}
                        onClick={e => {
                            handleCloseNavMenu();
                            navigate('/' + page.replace(' ', ''));
                        }} sx={{my: 2, color: 'black', display: 'block'}}
                    >
                        {page}
                    </Button>
                    )}
                </Box>

                <Box sx={{flexGrow: 0}}>
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar alt='Avatar' sx={{background: '#7FAD39'}} />
                    </IconButton>
                    <Menu
                        sx={{mt: '45px'}}
                        anchorEl={anchorElUser}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map(setting => <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography onClick={async() => {
                                if(setting === 'logout') {
                                    await Api.post('auth/logout');
                                    dispatch(logout());
                                    navigate('/home');
                                } else navigate('/' + setting);
                            }} textAlign='center'>{setting[0].toUpperCase() + setting.substring(1)}</Typography>
                        </MenuItem>)}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
}
