import * as React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { switchMode } from "../redux/reducer/switch.reducer";
import { RootState } from "../redux/store";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { IconButton } from "@mui/material";
export default function SwitchButton() {
  const dispatch = useDispatch();
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  const handleChangeTheme = () => {
    dispatch(switchMode(true));
  };

  return (
    <IconButton onClick={handleChangeTheme} sx={{ marginRight: 2 }}>
      {switchTheme ? (
        <WbSunnyIcon sx={{ color: "#fff", fontSize: 20 }} />
      ) : (
        <DarkModeIcon sx={{ color: "#fff", fontSize: 20 }} />
      )}
    </IconButton>
  );
}
