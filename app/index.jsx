// app/index.js or App.js (depending on your folder structure)
import { Redirect } from "expo-router";

export default function Index() {
  // As soon as the app loads, send the user straight to splash.js
  return <Redirect href="/auth/splash" />;
}
