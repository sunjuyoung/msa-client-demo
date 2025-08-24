import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useSearchStore } from "../../../shared/state/searchStore";
import { MobileSearchModal } from "../search/MobileSearchModal";

const categories = ["NEW", "남성", "여성", "ACC"];

export function AppHeader() {
  const trigger = useScrollTrigger({ threshold: 8 });
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const { query, setQuery, recent, addRecent } = useSearchStore();
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const suggestions = useMemo(() => {
    if (!query) return [];
    // Placeholder suggestions; replace with API-backed suggestions via React Query
    const sample = ["셔츠", "니트", "코트", "슬랙스", "원피스", "스니커즈"];
    return sample.filter((s) => s.includes(query)).slice(0, 6);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!anchorEl) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        setQuery(suggestions[highlightIndex]);
        addRecent(suggestions[highlightIndex]);
      } else if (query) {
        addRecent(query);
      }
      setAnchorEl(null);
    } else if (e.key === "Escape") {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    if (highlightIndex > suggestions.length - 1) setHighlightIndex(-1);
  }, [suggestions, highlightIndex]);

  return (
    <AppBar
      role="banner"
      elevation={trigger ? 2 : 1}
      className={`${
        trigger ? "shadow-headerScrolled" : "shadow-header"
      } transition-all duration-250`}
      sx={{
        position: "sticky",
        top: 0,
        backdropFilter: "saturate(180%) blur(6px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: trigger ? 56 : 72,
          transition: "min-height 250ms ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flex: { xs: 1, md: "none" },
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }} 
            onClick={() => navigate('/')}
            aria-label="홈으로"
          >
            TBH
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              if (v === 0) {
                navigate('/');
              } else {
                navigate('/category');
              }
            }}
            aria-label="카테고리 탭"
            textColor="inherit"
          >
            {categories.map((c) => (
              <Tab key={c} label={c} disableRipple />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Paper
            component="form"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (query) addRecent(query);
              setAnchorEl(null);
            }}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              px: 1,
              py: 0.5,
              borderRadius: 999,
              border: "1px solid",
              borderColor: "divider",
              minWidth: 280,
              mr: 1,
            }}
          >
            <SearchIcon aria-hidden />
            <InputBase
              placeholder="검색"
              inputProps={{ "aria-label": "검색어 입력" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => setAnchorEl(e.currentTarget)}
              onKeyDown={handleKeyDown}
              sx={{ ml: 1, flex: 1 }}
            />
          </Paper>
          <IconButton
            aria-label="검색"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            onClick={() => useSearchStore.getState().openMobile()}
          >
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="장바구니">
            <Badge color="primary" variant="dot">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="마이">
            <PersonOutlineIcon />
          </IconButton>
        </Box>

        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ zIndex: 1300 }}
          >
            <Paper
              sx={{
                mt: 1,
                width: 360,
                maxWidth: "calc(100vw - 32px)",
                borderRadius: 1.5,
              }}
            >
              <List role="listbox" aria-label="검색 자동완성">
                {suggestions.length === 0 && (
                  <>
                    <ListItem divider>
                      <ListItemText
                        primary="최근 검색"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                    {recent.length === 0 ? (
                      <ListItem>
                        <ListItemText primary="최근 검색어가 없습니다" />
                      </ListItem>
                    ) : (
                      recent.map((r) => (
                        <ListItemButton key={r} onClick={() => setQuery(r)}>
                          <ListItemText primary={r} />
                        </ListItemButton>
                      ))
                    )}
                  </>
                )}
                {suggestions.map((s, idx) => (
                  <ListItemButton
                    key={s}
                    selected={idx === highlightIndex}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onClick={() => {
                      setQuery(s);
                      addRecent(s);
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemText primary={s} />
                  </ListItemButton>
                ))}
              </List>
              <Divider />
              <Box sx={{ p: 1, textAlign: "right", color: "text.secondary" }}>
                <Typography variant="caption">
                  Enter로 검색 • Esc 닫기
                </Typography>
              </Box>
            </Paper>
          </Popper>
        </ClickAwayListener>
      </Toolbar>
      <MobileSearchModal />
    </AppBar>
  );
}
