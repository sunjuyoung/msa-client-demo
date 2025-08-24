import { useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSearchStore } from "../../../shared/state/searchStore";

export function MobileSearchModal() {
  const { isMobileOpen, closeMobile, query, setQuery, recent, addRecent } =
    useSearchStore();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isMobileOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isMobileOpen]);

  return (
    <Dialog
      fullScreen
      open={isMobileOpen}
      onClose={closeMobile}
      aria-label="모바일 검색"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeMobile}
            aria-label="닫기"
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              ml: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <InputBase
              inputRef={inputRef}
              fullWidth
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query) {
                  addRecent(query);
                  closeMobile();
                }
              }}
              inputProps={{ "aria-label": "검색어 입력" }}
              sx={{ color: "inherit" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
          최근 검색
        </Typography>
        <List>
          {recent.length === 0 ? (
            <Typography color="text.secondary">
              최근 검색어가 없습니다
            </Typography>
          ) : (
            recent.map((r) => (
              <ListItemButton
                key={r}
                onClick={() => {
                  setQuery(r);
                  closeMobile();
                }}
              >
                <ListItemText primary={r} />
              </ListItemButton>
            ))
          )}
        </List>
      </Box>
    </Dialog>
  );
}
