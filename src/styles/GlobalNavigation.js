import { Colors } from "./Colors";

export const GlobalNavigation = {
  headerStyle: {
    backgroundColor: Colors.primary,
    boxShadow: `0px 0px 3.84px ${Colors.shadowDark}`,
    elevation: 3,
  },
  headerTintColor: Colors.inactive,
  headerBackTitleVisible: true,
  headerBackTitleStyle: {
    color: Colors.inactive,
    fontSize: 14,
    fontWeight: "600",
  },
  headerLeftContainerStyle: { paddingLeft: 12 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.title,
  },
  tabBarStyle: { backgroundColor: Colors.primary },
  tabBarActiveTintColor: Colors.title,
  tabBarInactiveTintColor: Colors.inactive,
};
