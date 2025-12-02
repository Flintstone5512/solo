// services/notificationSetup.js
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io";

// Configure how notifications behave
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,     // ✅ Show even when app is foregrounded
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Ask for permission + register push token
export async function registerForPushNotificationsAsync(userId) {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission for push notifications not granted.");
      return;
    }

    // Get Expo push token
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra?.eas?.projectId,
    });

    const expoPushToken = tokenData.data;

    // Save token to backend
    await axios.post(`${BASE_URL}/api/users/update-push-token`, {
      userId,
      expoPushToken,
    });

    console.log("✅ Registered for push notifications:", expoPushToken);
    return expoPushToken;
  } catch (err) {
    console.error("Push registration failed:", err);
  }
}

// Handle taps on notifications
export function setupNotificationListeners() {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data;
      console.log("User tapped notification:", data);
    }
  );

  return () => subscription.remove();
}

// Optional: Schedule local notification (if you want client reminders too)
export async function scheduleLocalMotivation(time, message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Solo Motivation 💥",
      body: message,
      sound: true,
    },
    trigger: { seconds: time }, // e.g., 3600 = in 1 hour
  });
}
