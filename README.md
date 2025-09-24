

learning from this video: [Build a Full Stack React Native App with Payments | PostgreSQL, TypeScript, Stripe, Tailwind ](https://www.youtube.com/watch?v=kmy_YNhl0mw&list=PL6QREj8te1P54rZQx5AWWtFyf1hlznFjL&index=1)

why am i not trying this: https://netbeans.apache.org/front/main/download/nb27/

neno database: https://console.neon.tech/app/projects/broad-sea-14561247

 

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

 


i dont think we can view splash screen in expo go. see the stackoverflow here https://stackoverflow.com/questions/77405886/expo-app-not-displaying-custom-icon-and-splash-image . there is a note to that as well https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/#splash-screen 



