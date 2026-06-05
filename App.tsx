import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoginScreen }            from './screens/LoginScreen';
import { RegistrationScreen }     from './screens/RegistrationScreen';
import { RegistrationScreen2 }    from './screens/RegistrationScreen2';
import { ForgotPasswordScreen }   from './screens/ForgotPasswordScreen';
import { DashboardScreen }        from './screens/DashboardScreen';
import { HoldingTaxAbedonScreen }    from './screens/HoldingTaxAbedonScreen';
import { HoldingApplicationScreen }  from './screens/HoldingApplicationScreen';
import { NamjariApplicationScreen }  from './screens/NamjariApplicationScreen';
import { NayabadiApplicationScreen } from './screens/NayabadiApplicationScreen';
import { SearchScreen }                    from './screens/SearchScreen';
import { HoldingTaxAnusandhanScreen }      from './screens/HoldingTaxAnusandhanScreen';
import { EHoldingNumberScreen }             from './screens/EHoldingNumberScreen';
import { BokeyaBiboroniScreen }             from './screens/BokeyaBiboroniScreen';
import { QuickPayScreen }                   from './screens/QuickPayScreen';
import { OnlinePaymentDetailsScreen }       from './screens/OnlinePaymentDetailsScreen';
import { TradeLicenseApplicationScreen }    from './screens/TradeLicenseApplicationScreen';
import { TradeLicenseAnusandhanScreen }     from './screens/TradeLicenseAnusandhanScreen';
import { TradeLicenseAbedonScreen }         from './screens/TradeLicenseAbedonScreen';
import { TradeLicenseSearchScreen }        from './screens/TradeLicenseSearchScreen'
import { ApplicationFormScreen }  from './screens/ApplicationFormScreen';


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
          {/* ── Auth ──────────────────────────────────────────────────────── */}
          <Stack.Screen name="Login"          component={LoginScreen} />
          <Stack.Screen name="Registration"   component={RegistrationScreen} />
          <Stack.Screen name="Registration2"  component={RegistrationScreen2} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

          {/* ── Dashboard ─────────────────────────────────────────────────── */}
          <Stack.Screen name="Dashboard">
            {(props: any) => <DashboardScreen {...props} />}
          </Stack.Screen>

          {/* ── Holding Tax — আবেদন selection screen ──────────────────────── */}
          <Stack.Screen name="HoldingTaxAbedon" component={HoldingTaxAbedonScreen} />
          <Stack.Screen name="HoldingTaxAnusandhan" component={HoldingTaxAnusandhanScreen} />
          <Stack.Screen name="TradeLicenseAnusandhan" component={TradeLicenseAnusandhanScreen} />
          <Stack.Screen name="TradeLicenseAbedon" component={TradeLicenseAbedonScreen} />
          <Stack.Screen name="EHoldingNumber" component={EHoldingNumberScreen} />
          <Stack.Screen name="BokeyaBiboroni" component={BokeyaBiboroniScreen} />
          <Stack.Screen name="QuickPay" component={QuickPayScreen} />
          <Stack.Screen name="OnlinePaymentDetails" component={OnlinePaymentDetailsScreen} />

          {/* ── Holding Tax — sub-application forms ───────────────────────── */}
          <Stack.Screen name="NewHolding" component={HoldingApplicationScreen} />
          <Stack.Screen name="Namjari" component={NamjariApplicationScreen} />
          {/* <Stack.Screen name="Namjari_old">
            {(props: any) => (
              <ApplicationFormScreen
                {...props}
                route={{ ...props.route, params: { title: 'Namjari' } }}
              />
            )}
          </Stack.Screen> */}
          <Stack.Screen name="Nayabadi" component={NayabadiApplicationScreen} />
          {/* <Stack.Screen name="Nayabadi_old">
            {(props: any) => (
              <ApplicationFormScreen
                {...props}
                route={{ ...props.route, params: { title: 'Nayabadi' } }}
              />
            )}
          </Stack.Screen> */}
          <Stack.Screen name="FreedomFighter">
            {(props: any) => (
              <ApplicationFormScreen
                {...props}
                route={{ ...props.route, params: { title: 'FreedomFighter' } }}
              />
            )}
          </Stack.Screen>

          {/* ── Trade License — application forms ─────────────────────────── */}
          <Stack.Screen name="NewTradeLicense" component={TradeLicenseApplicationScreen} />
        
          {/* <Stack.Screen name="NewTradeLicense_old">
            {(props: any) => (
              <ApplicationFormScreen
                {...props}
                route={{ ...props.route, params: { title: 'NewTradeLicense' } }}
              />
            )}
          </Stack.Screen> */}
          <Stack.Screen name="OldTradeLicense" component={TradeLicenseApplicationScreen} />
          <Stack.Screen name="TradeLicenseChange">
            {(props: any) => (
              <ApplicationFormScreen
                {...props}
                route={{ ...props.route, params: { title: 'TradeLicenseChange' } }}
              />
            )}
          </Stack.Screen>

          {/* ── Search screens ─────────────────────────────────────────────── */}
          <Stack.Screen name="HoldingSearch">
            {(props: any) => (
              <SearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'HoldingSearch' } }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="NamjariSearch">
            {(props: any) => (
              <SearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'NamjariSearch' } }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="NayabadiSearch">
            {(props: any) => (
              <SearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'NayabadiSearch' } }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="FreedomFighterSearch">
            {(props: any) => (
              <SearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'FreedomFighterSearch' } }}
              />
            )}
          </Stack.Screen>
           <Stack.Screen name="TradeLicenseSearch">
            {(props: any) => (
              <SearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'TradeLicenseSearch' } }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="NewTLSearch">
            {(props: any) => (
              <TradeLicenseSearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'TradeLicenseSearchScreen' } }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="OldTLSearch">
            {(props: any) => (
              <TradeLicenseSearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'TradeLicenseSearchScreen' } }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="ChangeTLSearch">
            {(props: any) => (
              <TradeLicenseSearchScreen
                {...props}
                route={{ ...props.route, params: { title: 'TradeLicenseSearchScreen' } }}
              />
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
