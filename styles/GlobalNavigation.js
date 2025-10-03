import { Colors } from "./Colors";

// GlobalNavigation contains both style objects (headerStyle, title) and
// navigator options (headerTintColor, tabBarActiveTintColor, ...). Using
// StyleSheet.create here caused errors because some values are not style
// objects (strings/booleans). Export a plain object instead and only use
// StyleSheet.create for values meant as `style` props.
export const GlobalNavigation = {
  headerStyle: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.boxShadow || '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
