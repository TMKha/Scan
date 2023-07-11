import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./src/navigation/AppStack";



const App = () => {
  return (
    <NavigationContainer>
      <MainScreen/>
    </NavigationContainer>
  );
};

export default App;
