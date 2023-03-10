import * as React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { idolTokuDa } from "../../utils/baseAvartar";
interface BlockChildItemProps {
  item: any;
  i: number;
}

const BlockChildItem: React.FunctionComponent<BlockChildItemProps> = ({
  item,
  i,
}: BlockChildItemProps) => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  return (
    <>
      <div className="img">
        <Box component={Link} to={`/${item.category}/${item.id}`}>
          <img src={item.image ? item.image : idolTokuDa} alt={item.title} />
        </Box>
      </div>
      <div className="content">
        <Box
          component={Link}
          to={`/${item.category}/${item.id}`}
          sx={{ color: switchTheme ? "#fff" : "#333" }}
        >
          <h3 className="heading">{item.title}</h3>
        </Box>
        <div className="description">{item.description}</div>
      </div>
    </>
  );
};

export default BlockChildItem;
