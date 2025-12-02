import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Alert,
} from "react-native";
import { router } from "expo-router";
import Back from "../../assets/images/Back.svg";
import Dark_back from "../../assets/images/White_back.svg";
import ThemeContext from "../../theme/ThemeContext";
import { useAuth } from "../auth/AuthContext";
import Logout from "../../assets/images/logout.svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io";

const Profile = () => {
  const { theme, darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  // 🔹 Work Schedule State
  const [start, setStart] = useState(new Date("1970-01-01T08:00:00"));
  const [end, setEnd] = useState(new Date("1970-01-01T17:00:00"));
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  // 🔹 NEW: Time Picker visibility states
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchSchedule();
    }
  }, [user]);

  const fetchSchedule = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/users/${user._id}/schedule`
      );
      if (data?.success && data.workSchedule) {
        const { start, end, days } = data.workSchedule;
        if (start) setStart(new Date(`1970-01-01T${start}`));
        if (end) setEnd(new Date(`1970-01-01T${end}`));
        if (days) setDays(days);
      }
    } catch (err) {
      console.error("Failed to load schedule:", err.message);
    }
  };

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const saveSchedule = async () => {
    try {
      await axios.post(`${BASE_URL}/api/users/update-schedule`, {
        userId: user._id,
        workSchedule: {
          start: start.toTimeString().slice(0, 5),
          end: end.toTimeString().slice(0, 5),
          days,
        },
      });
      Alert.alert("✅ Success", "Work schedule saved successfully!");
    } catch (err) {
      console.error("Failed to save schedule:", err);
      Alert.alert("❌ Error", "Failed to save work schedule");
    }
  };

  const handleLogout = () => setModalVisible(true);
  const confirmLogout = async () => {
    setModalVisible(false);
    await logout();
    router.replace("/login");
  };
  const cancelLogout = () => setModalVisible(false);
  const goBack = () => router.push("home");
  const handleEditProfile = () => router.push("/edit-profile");

  const profileImage =
    user?.profileImage || require("../../assets/images/profile_image.png");

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          {darkMode ? <Dark_back /> : <Back />}
        </TouchableOpacity>
        <Text style={[styles.heading, { color: theme.color }]}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View style={styles.image_box}>
          <Image source={profileImage} style={styles.image} />
          <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.details_row}>
          <View style={styles.profile_details}>
            <Text style={[styles.name, { color: theme.color }]}>
              {user?.name || "Solo Warrior"}
            </Text>
            <Text style={styles.email}>
              {user?.email || "email@example.com"}
            </Text>
            {user?.phone && <Text style={styles.number}>{user.phone}</Text>}
          </View>
        </View>

        {/* Account Overview */}
        <View style={[styles.card, { backgroundColor: theme.cardbg2 }]}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>
            Account Overview
          </Text>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.color }]}>
                ${user?.balance?.toFixed(2) || "0.00"}
              </Text>
              <Text style={styles.statLabel}>Balance</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.color }]}>
                {user?.goals?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.color }]}>
                {user?.transactions?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={[styles.card, { backgroundColor: theme.cardbg2 }]}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>
            Preferences
          </Text>

          {/* Dark Mode */}
          <View style={styles.row}>
            <Text style={[styles.row_text, { color: theme.text }]}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FF85A2" }}
              thumbColor="#f4f3f4"
              onValueChange={toggleTheme}
              value={darkMode}
              style={styles.switch}
            />
          </View>

          {/* Work Schedule */}
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.sectionSubtitle, { color: theme.color }]}>
              Work Schedule
            </Text>

            {/* Start Time */}
            <View style={styles.timeRow}>
              <Text style={[styles.timeLabel, { color: theme.text }]}>
                Start:
              </Text>

              <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <Text style={[styles.timeLabel, { color: theme.text }]}>
                  {start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>

              {showStartPicker && (
                <DateTimePicker
                  value={start}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(e, time) => {
                    setShowStartPicker(false);
                    if (time) setStart(time);
                  }}
                />
              )}
            </View>

            {/* End Time */}
            <View style={styles.timeRow}>
              <Text style={[styles.timeLabel, { color: theme.text }]}>
                End:
              </Text>

              <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <Text style={[styles.timeLabel, { color: theme.text }]}>
                  {end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>

              {showEndPicker && (
                <DateTimePicker
                  value={end}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(e, time) => {
                    setShowEndPicker(false);
                    if (time) setEnd(time);
                  }}
                />
              )}
            </View>

            {/* Work Days */}
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.timeLabel, { color: theme.text }]}>
                Days:
              </Text>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <View key={day} style={styles.dayRow}>
                    <Text style={{ color: theme.text }}>{day}</Text>
                    <Switch
                      value={days.includes(day)}
                      onValueChange={() => toggleDay(day)}
                      trackColor={{ false: "#767577", true: "#7C00FF" }}
                    />
                  </View>
                )
              )}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
              <Text style={styles.saveButtonText}>Save Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Logout />
          <Text style={[styles.logout_text, { color: theme.log }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, { backgroundColor: theme.cardbg2 }]}>
            <Text className={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={confirmLogout}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={cancelLogout}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingHorizontal: 20, flex: 1 },
  header: { flexDirection: "row", alignItems: "center", gap: 30 },
  heading: { fontSize: 24, fontFamily: "Cabin_700Bold" },
  image_box: { alignItems: "center", justifyContent: "center", marginVertical: 30 },
  image: { width: 100, height: 100, borderRadius: 50 },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 120,
    backgroundColor: "#3629B7",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  editText: { color: "#fff", fontSize: 12 },
  details_row: { alignItems: "center", justifyContent: "center" },
  profile_details: { alignItems: "center" },
  name: { fontSize: 18, fontFamily: "Cabin_700Bold" },
  email: { fontSize: 14, color: "#757575" },
  number: { fontSize: 13, color: "#757575" },
  card: { borderRadius: 12, padding: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontFamily: "Cabin_700Bold", marginBottom: 10 },
  sectionSubtitle: { fontSize: 14, fontFamily: "Cabin_700Bold", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  row_text: { fontSize: 14, fontFamily: "Lato_400Regular" },
  switch: { width: 50 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  timeLabel: { fontSize: 14, fontFamily: "Lato_400Regular" },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: "#3629B7",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Cabin_700Bold",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 45,
    marginTop: 25,
  },
  logout_text: {
    fontSize: 14,
    fontFamily: "Cabin_500Medium",
    color: "#FE1717",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: { borderRadius: 20, padding: 35, alignItems: "center" },
  modalText: { fontSize: 18, marginBottom: 15, textAlign: "center" },
  modalButtons: { flexDirection: "row", gap: 10 },
  button: {
    backgroundColor: "#3629B7",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonCancel: { backgroundColor: "#757575" },
  buttonText: { color: "white", fontSize: 16 },
});
