import * as React from "react";
import Layout from "../../components/backend/Layout";
interface SettingsProps {}

const Settings: React.FunctionComponent<SettingsProps> = () => {
  return (
    <Layout>
      <div className="setting">Settings</div>
    </Layout>
  );
};

export default Settings;
