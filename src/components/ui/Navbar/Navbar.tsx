import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  useScrollTrigger,
  Box,
  ListItemIcon,
  Typography,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  iconComponents,
  TOP_LISTS,
  IconNameType,
  MOVIE_LISTS,
} from "../../../constants";
import Search from "../Search";
import { ColorModeContext } from "../../../context/ColorModeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Icon: React.FC<{ iconName: IconNameType }> = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map((item) => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LISTS.map((item) => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Stack
              flexDirection="row"
              justifyContent={"space-between"}
              alignItems="center"
              width={"100%"}
            >
              <Typography
                sx={{ color: "white", textDecoration: "none" }}
                component={RouterLink}
                variant="h4"
                to="/"
              >
                badflix
              </Typography>
              <Search />
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
