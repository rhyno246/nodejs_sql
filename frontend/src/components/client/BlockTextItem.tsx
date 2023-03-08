import * as React from "react";
import { Link } from "react-router-dom";
interface BlockTextItemProps {
  item: any;
  i: number;
}

const BlockTextItem: React.FunctionComponent<BlockTextItemProps> = ({
  item,
  i,
}: BlockTextItemProps) => {
  return (
    <p className="block-child" key={i}>
      <Link to={`/${item.category}/${item.id}`}>{item.title}</Link>
    </p>
  );
};

export default BlockTextItem;
