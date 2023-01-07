import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
interface MetaDataProps {
  title: string;
}

const MetaData: React.FunctionComponent<MetaDataProps> = ({
  title,
}: MetaDataProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
