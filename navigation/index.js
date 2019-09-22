import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { theme } from "../constants";

import Welcome from "../screens/Welcome";
import Explore from "../screens/Explore";
import Product from "../screens/Product";
import Login from "../screens/Login";
import Forgot from "../screens/Forgot";
import SignUp from "../screens/SignUp";
import Settings from "../screens/Settings";
import Browse from "../screens/Browse";

const screens = createStackNavigator(
  {
    Welcome,
    Explore,
    Product,
    Login,
    Forgot,
    SignUp,
    Settings,
    Browse
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: "white",
        borderBottomColor: "transparent",
        elevation: 0
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

export default createAppContainer(screens);
