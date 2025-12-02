import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  Linking,
  Dimensions,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MoneyStackChartBar from "../../components/MoneyStackChartBar";
import PeriodToggle from "../../components/PeriodToggle";
import ChartsSection from "../../components/ChartsSection";
import GoalsSection from "../../components/GoalsSection";
import ThemeContext from "../../theme/ThemeContext";
import AuthContext from "../auth/AuthContext";
import {
  getTransactions,
  saveIncome,
  saveBill,
  saveGoal,
  getBills,
  getGoals,
  getTransactionSummary,
} from "../services/api";
import TopDreamsSection from "../../components/TopDreamsSection";
import BillsSection from "../../components/BillsSection";
import IncomeSection from "../../components/IncomeSection";
import Carousel from "react-native-reanimated-carousel";

// Lazy import for native spotlight (avoids crashing web)
let SpotlightTour, SpotlightStep, useSpotlightTour;
if (Platform.OS !== "web") {
  const spotlight = require("react-native-spotlight-tour");
  SpotlightTour = spotlight.default;
  SpotlightStep = spotlight.SpotlightStep;
  useSpotlightTour = spotlight.useSpotlightTour;
}

const { width } = Dimensions.get("window");
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";
const TELLER_APP_ID = process.env.EXPO_PUBLIC_TELLER_APP_ID;

const offers = [
  {
    id: 1,
    title: "Solo Pay",
    description: "Auto-generate paystubs & income proof for mortgages & cars.",
    link: "https://your-landing-page.com/loan-ready",
    backgroundColor: "#ff6b6b",
  },
  {
    id: 2,
    title: "Solo Money",
    description: "Create a secure retirement + emergency fund without stress.",
    link: "https://your-landing-page.com/safety-net",
    backgroundColor: "#1e90ff",
  },
  {
    id: 3,
    title: "Solo Credit",
    description: "Boost your credit score with AI-powered strategies.",
    link: "https://your-landing-page.com/credit-builder",
    backgroundColor: "#28a745",
  },
  {
    id: 4,
    title: "Solo Retire",
    description: "Save up to $66,000 per year using Solo 401(k) strategies.",
    link: "https://your-landing-page.com/tax-savings",
    backgroundColor: "#ffa502",
  },
];

const DashboardContent = ({ spotlightEnabled }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const tourController = spotlightEnabled ? useSpotlightTour?.() : null;

  const [transactions, setTransactions] = useState([]);
  const [bills, setBills] = useState([]);
  const [goalData, setGoalData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });
  const [summary, setSummary] = useState({ income: 0, expenses: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [showWebView, setShowWebView] = useState(false);
  const userId = user?.userId;

  useEffect(() => {
    if (userId) fetchInitialData();
  }, [userId]);

  useEffect(() => {
    if (userId) fetchSummary();
  }, [userId, selectedPeriod]);

  useEffect(() => {
    if (!spotlightEnabled) return;
    (async () => {
      const seenTour = await AsyncStorage.getItem("seenTour");
      if (!seenTour) {
        setTimeout(() => tourController?.start?.(), 1200);
        await AsyncStorage.setItem("seenTour", "true");
      }
    })();
  }, [spotlightEnabled]);

  const fetchInitialData = async () => {
    try {
      const txnRes = await getTransactions(userId);
      const txnData = txnRes.transactions || [];
      const billData = await getBills(userId);
      const goals = await getGoals(userId);
      setTransactions(txnData);
      setBills(billData || []);
      setGoalData(goals || { daily: 0, weekly: 0, monthly: 0, yearly: 0 });
    } catch (err) {
      console.error("❌ Failed to load dashboard data:", err);
      Alert.alert("Error", "Failed to load data.");
    }
  };

  const fetchSummary = async () => {
    try {
      const result = await getTransactionSummary(
        userId,
        selectedPeriod.toLowerCase()
      );
      setSummary({
        income: result?.income || 0,
        expenses: result?.expenses || 0,
      });
    } catch (err) {
      console.error("❌ Failed to fetch summary:", err);
    }
  };

  const handleGoalChange = (newGoals) => {
    setGoalData(newGoals);
  };

  const handleSaveGoals = async () => {
    try {
      await saveGoal({ userId, ...goalData });
      Alert.alert("✅ Success", "Goals saved!");
    } catch (err) {
      console.error("❌ Error saving goals:", err);
      Alert.alert("Error", "Failed to save goals.");
    }
  };

  const handleAddIncome = async (income) => {
    await saveIncome({ userId, ...income });
    fetchInitialData();
    fetchSummary();
  };

  const handleAddBill = async (bill) => {
    await saveBill({ userId, ...bill });
    fetchInitialData();
    fetchSummary();
  };

  const handleWebViewNavChange = async (event) => {
    if (event.url && event.url.includes("public_token=")) {
      try {
        const url = new URL(event.url);
        const publicToken = url.searchParams.get("public_token");
        if (publicToken) {
          await axios.post(`${API_BASE_URL}/api/teller/enroll`, {
            userId,
            publicToken,
          });
          Alert.alert("✅ Success", "Bank connected via Teller!");
          setShowWebView(false);
          fetchInitialData();
          fetchSummary();
        }
      } catch (err) {
        console.error("❌ Teller enrollment error:", err);
        Alert.alert("Error", "Failed to connect bank.");
      }
    }
  };

  const Step = ({ name, text, children }) => {
    if (!spotlightEnabled || !SpotlightStep) return children;
    return <SpotlightStep name={name} text={text}>{children}</SpotlightStep>;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme?.background || "#f5f6fa" }]}
    >
      {/* 🔁 Carousel */}
      <View style={styles.carouselWrapper}>
        <Carousel
          loop
          width={width - 32}
          height={120}
          autoPlay
          autoPlayInterval={4000}
          data={offers}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.offerCard, { backgroundColor: item.backgroundColor }]}
              onPress={() => Linking.openURL(item.link)}
            >
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerDescription}>{item.description}</Text>
              <Text style={styles.offerLink}>Learn More →</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TopDreamsSection />

      {/* 🏦 Connect Teller */}
      <Step name="connectBank" text="Step 1: Connect your bank securely with Teller.">
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => setShowWebView(true)}
        >
          <Text style={styles.connectText}>🏦 Connect Bank with Teller</Text>
        </TouchableOpacity>
      </Step>

      <Modal visible={showWebView} animationType="slide">
        <WebView
          source={{ uri: `https://connect.teller.io?application_id=${TELLER_APP_ID}` }}
          onNavigationStateChange={handleWebViewNavChange}
        />
      </Modal>

      {/* 🎯 Full Goals Section */}
      <Step name="setGoal" text="Step 2: Set your daily earning goal — the rest auto-calculates.">
        <GoalsSection goals={goalData} onChange={handleGoalChange} onSave={handleSaveGoals} />
      </Step>

      {/* 📊 Charts */}
      <Step name="viewCharts" text="Step 3: Track your earnings, expenses, and profit by time period.">
        <View style={styles.card}>
          <PeriodToggle selected={selectedPeriod} onChange={setSelectedPeriod} />
          <MoneyStackChartBar
            income={summary.income}
            expenses={summary.expenses}
            goal={
              selectedPeriod === "Daily"
                ? goalData.daily
                : selectedPeriod === "Weekly"
                ? goalData.weekly
                : selectedPeriod === "Monthly"
                ? goalData.monthly
                : goalData.yearly
            }
            selectedPeriod={selectedPeriod}
          />
        </View>
      </Step>

      {/* 💸 Charts Section */}
      <ChartsSection
        income={summary.income}
        expenses={summary.expenses}
        selectedPeriod={selectedPeriod}
      />

      {/* 💰 Income */}
      <Step name="addIncome" text="Step 4: Add more income from side gigs or cash.">
        <IncomeSection onAddIncome={handleAddIncome} />
      </Step>

      {/* 🧾 Bills */}
      <Step name="addBills" text="Step 5: Add your recurring bills to track expenses.">
        <BillsSection bills={bills} onAddBill={handleAddBill} />
      </Step>

      {spotlightEnabled && (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={() => tourController?.start?.()}>
            <Text style={styles.buttonText}>🎥 Replay Tour</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default function HomeDashboard() {
  const steps = [
    { name: "connectBank", text: "Step 1: Connect your bank securely with Teller." },
    { name: "setGoal", text: "Step 2: Set your daily earning goal — the rest auto-calculates." },
    { name: "viewCharts", text: "Step 3: Track your income, expenses, and profit by time period." },
    { name: "addIncome", text: "Step 4: Add income from side gigs or cash sources." },
    { name: "addBills", text: "Step 5: Add your recurring bills to manage expenses." },
  ];

  if (Platform.OS === "web") {
    return <DashboardContent spotlightEnabled={false} />;
  }

  const SpotlightWrapper = SpotlightTour || React.Fragment;

  return (
    <SpotlightWrapper steps={steps} visible={true}>
      <DashboardContent spotlightEnabled={true} />
    </SpotlightWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  carouselWrapper: { marginVertical: 10 },
  offerCard: { borderRadius: 12, padding: 16 },
  offerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  offerDescription: { fontSize: 14, color: "#fff", marginVertical: 4 },
  offerLink: { fontSize: 14, color: "#fff", fontWeight: "600" },
  connectButton: {
    backgroundColor: "#6c5ce7",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginVertical: 12,
  },
  connectText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: "#6c5ce7",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
