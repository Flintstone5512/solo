import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://YOUR-GENEZIO-URL.com";

export default function EditSchedule({ user }) {
  const [start, setStart] = useState(new Date("1970-01-01T08:00:00"));
  const [end, setEnd] = useState(new Date("1970-01-01T17:00:00"));
  const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday"]);

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const saveSchedule = async () => {
    await axios.post(`${BASE_URL}/api/users/update-schedule`, {
      userId: user._id,
      workSchedule: {
        start: start.toTimeString().slice(0, 5),
        end: end.toTimeString().slice(0, 5),
        days,
      },
    });
    alert("✅ Work schedule saved!");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Work Hours</Text>

      <DateTimePicker
        value={start}
        mode="time"
        onChange={(e, time) => setStart(time)}
      />
      <DateTimePicker
        value={end}
        mode="time"
        onChange={(e, time) => setEnd(time)}
      />

      <Text style={{ marginTop: 20, fontSize: 16 }}>Work Days</Text>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
        <View key={day} style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{day}</Text>
          <Switch value={days.includes(day)} onValueChange={() => toggleDay(day)} />
        </View>
      ))}

      <TouchableOpacity onPress={saveSchedule} style={{ marginTop: 20, backgroundColor: "#3629B7", padding: 10, borderRadius: 10 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Save Schedule</Text>
      </TouchableOpacity>
    </View>
  );
}
