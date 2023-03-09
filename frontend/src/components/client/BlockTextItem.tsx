import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
interface BlockTextItemProps {
  item: any;
  i: number;
}

const BlockTextItem: React.FunctionComponent<BlockTextItemProps> = ({
  item,
  i,
}: BlockTextItemProps) => {
  const switchTheme = useSelector((state: RootState) => state.switch.isSwitch);
  return (
    <p className="block-child" key={i} style={{ borderBottom : `1px solid ${ switchTheme ? "#e5e5e5" : "#e2e2e2" }` }}>
      <Link to={`/${item.category}/${item.id}`} style={{ color: switchTheme ? "#e5e5e5" : "#333" }}>{item.title}</Link>
    </p>
  );
};

export default BlockTextItem;
