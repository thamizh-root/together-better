
04hr 43min

learning from this video: [Build a Full Stack React Native App with Payments | PostgreSQL, TypeScript, Stripe, Tailwind ](https://www.youtube.com/watch?v=kmy_YNhl0mw&list=PL6QREj8te1P54rZQx5AWWtFyf1hlznFjL&index=1)

neno database: https://console.neon.tech/app/projects/broad-sea-14561247
clerk auth: https://dashboard.clerk.com/apps/app_33W5UMFuS4PNXRiZ8escx6CE3EH/instances/ins_33W5UIIzKgyyuyvvT0Mk3sUvij1
github repo: https://github.com/adrianhajdin/portfolio 

-----

expo start - to start the application

step 01 is installing nativewind css

simply follow the steps, yet you will fail at 



/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
closly look at the ‘content’ 

it should match all the files that gonna use expo

 why am i not trying this: https://netbeans.apache.org/front/main/download/nb27/


i dont think we can view splash screen in expo go. see the stackoverflow here https://stackoverflow.com/questions/77405886/expo-app-not-displaying-custom-icon-and-splash-image . there is a note to that as well https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/#splash-screen 


app/(tabs)/index.tsx is the default route for the (tabs) directory, so it will be the initially-focused tab, and will match the / URL.
above concept is not working: https://docs.expo.dev/router/basics/notation/#parentheses
Q: i still dont understand why "index" works and "/" does not works
A: "_layout.tsx" is necessary, with layout.tsx, "/" takes 

interesting finding: just redirecting using "/" wont hide header
"_layout.tsx" is used to configure how (with or without header options) to display the page and where (stack, tabs, slot) to display the page

Q: /settings is not (tabs)/settings, but docs says it will work.


sat, 27 september
1. css has width-[29px] - what does it mean
2. why importing like @assets/images/<something> throws error
3. how adding types/images.d.ts solved above @assets error
4. why scrollview added in sign-up.tsx

sunday, 28 september


thursday, 02 october
1. how to create a thin line?
  <View className="flex-1 h-[1px] bg-general-100"></View>
2. copy paste /sign-up page to create /sign-in page. real coding, lol!
3. using "clerk"


saturday, 04 oct
1. will route work even without "/_layout.tsx".
2. complete signup, signin is done and started using clerk  
tokenCache is pre-built in the updated version we are using

sunday, 05 oct
1. when using useUser(), there is some values like  isLoaded, user, isSignedIn .
dont simply return null, if !loading, show some content with <safeareaview> [**extra]
if there is no firstname available in the clerk user account, then you will get the same in useUser() hook.
2. bottom-navigation-bar has been configured by us for bigger screen.
3. added neon database with fetch /lib
4. have not added origin like he did in app.json, just see whether it will cause any error [**extra]


tuesday, 07 oct
1. signed up for https://myprojects.geoapify.com/projects


saturday, 11 oct 
1. building dashboard, knowing flexbox, helped a lot here!

2. 
Error while updating property 'mapType' of view managed by: AIRMap
#2654
https://github.com/react-native-maps/react-native-maps/issues/2654

none of these solution worked. https://github.com/react-native-maps/react-native-maps/issues/5424
only these steps worked :https://docs.expo.dev/versions/latest/sdk/map-view/


so real another big problem is, google maps says for payment details even for free trials
using olamaps now, developed a custom component... yay!! finally we are coding.. aye?


sunday, 12 oct 

1. again and again we are facing an issue..
when we tried to install react-native-google-maps ---> expo install <npm-module> fixed... it just installed compatible version...


again today.. we tried to install react-native-bottom-sheet caused issue ---> expo install <npm-module> has fixed the issue.

2. renderItem={({item}: any) => <DriverCard item={item} />
above is not same as 
renderItem={(item: any) => <DriverCard item={item}


wednesday, 15 oct

1. // we dont have a google map API, so no directions
[*** how to fix this]


thursday, 16 oct

1.     const paymentDetails: any = await presentPaymentSheet();
    // TO-DO: above method is not returning payment details
    // so we cannot double-check the payments

