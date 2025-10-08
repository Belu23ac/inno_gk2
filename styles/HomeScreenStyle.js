import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const HomeScreenStyle = StyleSheet.create({
  // HomeScreen specific styles
  safe: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  titleRow: { 
    marginBottom: 12 
  },
  headerRow: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  avatar: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    marginRight: 10 
  },
  headerText: { 
    flexDirection: "column" 
  },
  username: { 
    fontWeight: "700", 
    fontSize: 16 
  },
  time: { 
    color: Colors.textMuted, 
    fontSize: 12 
  },
  body: { 
    marginTop: 8 
  },
  beerName: { 
    fontSize: 16, 
    fontWeight: "700" 
  },
  breweryName: { 
    color: Colors.textPrimary, 
    marginTop: 2 
  },
  starsRow: { 
    flexDirection: "row", 
    marginTop: 6 
  },
  star: { 
    fontSize: 16, 
    marginRight: 2 
  },
  starFilled: { 
    color: Colors.starYellow 
  },
  starEmpty: { 
    color: Colors.mediumGray 
  },
  review: { 
    marginTop: 8, 
    color: Colors.textPrimary 
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  actionButton: { 
    marginLeft: 12 
  },
  actionText: { 
    color: Colors.linkBlue, 
    fontWeight: "600" 
  },
});