import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { RegistrationScreen2 } from './screens/RegistrationScreen2';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ApplicationFormScreen } from './screens/ApplicationFormScreen';
import { SearchScreen } from './screens/SearchScreen';
import { HoldingTaxAbedonScreen } from './screens/HoldingTaxAbedonScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Registration2" component={RegistrationScreen2} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        
        {/* Dashboard */}
        <Stack.Screen name="Dashboard" options={{ title: 'ড্যাশবোর্ড' }}>
          {(props: any) => <DashboardScreen {...props} />}
        </Stack.Screen>

        {/* Holding Tax Application Screens */}
        <Stack.Screen name="NewHolding" options={{ title: 'নতুন হোল্ডিং এর আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'NewHolding' } }} />}
        </Stack.Screen>
        <Stack.Screen name="Namjari" options={{ title: 'নামজারির আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'Namjari' } }} />}
        </Stack.Screen>
        <Stack.Screen name="Nayabadi" options={{ title: 'নয়াবাদি আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'Nayabadi' } }} />}
        </Stack.Screen>
        <Stack.Screen name="FreedomFighter" options={{ title: 'মুক্তিযোদ্ধার সুবিধার আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'FreedomFighter' } }} />}
        </Stack.Screen>

        {/* Trade License Application Screens */}
        <Stack.Screen name="NewTradeLicense" options={{ title: 'নতুন ট্রেড লাইসেন্সের আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'NewTradeLicense' } }} />}
        </Stack.Screen>
        <Stack.Screen name="OldTradeLicense" options={{ title: 'পুরাতন ট্রেড লাইসেন্সের আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'OldTradeLicense' } }} />}
        </Stack.Screen>
        <Stack.Screen name="TradeLicenseChange" options={{ title: 'পরিবর্তন/সংশোধন আবেদন' }}>
          {(props: any) => <ApplicationFormScreen {...props} route={{ ...props.route, params: { title: 'TradeLicenseChange' } }} />}
        </Stack.Screen>

        {/* Search Screens */}
        <Stack.Screen name="HoldingSearch" options={{ title: 'হোল্ডিং ট্যাক্স অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'HoldingSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="NamjariSearch" options={{ title: 'নামজারি অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'NamjariSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="NayabadiSearch" options={{ title: 'নয়াবাদি অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'NayabadiSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="FreedomFighterSearch" options={{ title: 'মুক্তিযোদ্ধা অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'FreedomFighterSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="TradeLicenseSearch" options={{ title: 'ট্রেড লাইসেন্স অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'NewTLSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="NewTLSearch" options={{ title: 'নতুন ট্রেড লাইসেন্স অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'NewTLSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="OldTLSearch" options={{ title: 'পুরাতন ট্রেড লাইসেন্স অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'OldTLSearch' } }} />}
        </Stack.Screen>
        <Stack.Screen name="ChangeTLSearch" options={{ title: 'পরিবর্তন/সংশোধন অনুসন্ধান' }}>
          {(props: any) => <SearchScreen {...props} route={{ ...props.route, params: { title: 'ChangeTLSearch' } }} />}
        </Stack.Screen>
       
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
