import { Stack } from 'expo-router';


const DashboardLayout = () => {

  // This layout is used for the dashboard section of the app.
  // It can be used to define common components or styles for all dashboard screens.
  // Currently, it does not have any specific components or styles defined.
  // You can add components like a header, footer, or sidebar here if needed.
  // For now, it simply returns an empty Stack component with headerShown set to false.
  // You can also add navigation options or other configurations to the Stack component if needed.
  // This layout is used to wrap all dashboard-related screens.

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
    </Stack>
    


  );
};

export default DashboardLayout;


