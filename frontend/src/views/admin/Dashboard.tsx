import * as React from "react";
import Layout from "../../components/backend/Layout";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
interface DashBoardProps {}

const DashBoard: React.FunctionComponent<DashBoardProps> = () => {
  return (
    <Layout>
      <Card>
        <CardHeader title="DashBoard" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DashBoard;
