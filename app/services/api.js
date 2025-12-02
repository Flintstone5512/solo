// services/api.js (Expo/React Native app)
import axios from "axios";



const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io";

/**
 * 🔹 Teller Helpers
 */

/**
 * Save Teller enrollment (called after WebView returns public_token)
 */
export const saveTellerEnrollment = async (userId, publicToken) => {
  if (!userId || !publicToken)
    throw new Error("Missing userId or publicToken for Teller enrollment");

  const { data } = await axios.post(`${BASE_URL}/api/teller/enroll`, {
    userId,
    publicToken,
  });
  return data;
};

/**
 * List Teller accounts linked for this user
 */
export const listTellerAccounts = async (userId) => {
  if (!userId) throw new Error("Missing userId");
  const { data } = await axios.get(
    `${BASE_URL}/api/teller/accounts?userId=${userId}`
  );
  return data.accounts || [];
};

/**
 * Fetch and sync transactions via Teller.
 */
/**
 * Fetch paginated transactions via Teller.
 */
export const getTransactions = async (userId, page = 1, pageSize = 50) => {
  if (!userId) throw new Error("User ID is missing. Are you logged in?");

  // Step 1: Get Teller Access Token
  const { data } = await axios.get(
    `${BASE_URL}/api/teller/access-token?userId=${userId}`
  );
  const accessToken = data.accessToken;

  // Step 2: Trigger Teller backend to fetch/sync new transactions
  await axios.post(`${BASE_URL}/api/teller/fetch-transactions`, {
    accessToken,
    userId,
    skipDuplicateCheck: true,
  });

  // Step 3: Get paginated transactions from DB
  const res = await axios.get(
    `${BASE_URL}/transactions/by-user/${userId}?page=${page}&pageSize=${pageSize}`
  );

  return res.data.transactions || [];

};

/**
 * Fetch category breakdown for a user and period.
 * Expected backend route: GET /transactions/user/:userId/breakdown?period=monthly|daily|weekly|yearly
 * Response shape: { success: true, breakdown: [{ category: 'Food', amount: 120 }, ...] }
 */
export const getCategoryBreakdown = async (userId, period = "monthly") => {
  if (!userId) throw new Error("Missing userId for category breakdown");
  const { data } = await axios.get(`${BASE_URL}/transactions/user/${userId}/breakdown?period=${period}`);
  // defensive return
  if (!data) return [];
  // some backends return { success, breakdown }, others return array directly
  if (Array.isArray(data)) return data;
  return data.breakdown || [];
};


/**
 * 🔹 Transaction Summary
 * Fetches income & expenses totals for a given user and period.
 * Period can be: "daily" | "weekly" | "monthly" | "yearly"
 */
export const getTransactionSummary = async (userId, period = "monthly") => {
  if (!userId) throw new Error("User ID is missing. Are you logged in?");

  const { data } = await axios.get(
    `${BASE_URL}/transactions/user/${userId}/summary?period=${period}`
  );

  if (!data.success) throw new Error("Failed to fetch transaction summary");

  // ✅ Always return normalized object
  return {
    income: data.income || 0,
    expenses: data.expenses || 0,
    period: data.period || period,
  };
};




/**
 * 🔹 Income & Bills
 */
export const saveIncome = async (income) => {
  await axios.post(`${BASE_URL}/api/income`, income);
};

export const saveBill = async (bill) => {
  await axios.post(`${BASE_URL}/api/bills`, bill);
};

export const getBills = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/api/bills/${userId}`);
  return data;
};

/**
 * 🔹 Goals
 */
export async function saveGoal(goals) {
  const res = await fetch(`${BASE_URL}/api/goal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goals),
  });

  if (!res.ok) throw new Error("Failed to save goal");
  return res.json();
}

export const getGoals = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/api/goal/${userId}`);
  return data;
};

export async function createDream(payload) {
  const { data } = await axios.post(`${BASE_URL}/api/dreams`, payload);
  return data.dream;
}
export async function getDreams(userId) {
  const { data } = await axios.get(`${BASE_URL}/api/dreams/${userId}`);
  return data.dreams || [];
}
export async function contributeToDream(id, amount) {
  const { data } = await axios.patch(`${BASE_URL}/api/dreams/${id}`, { contribute: amount });
  return data.dream;
}
export async function deleteDream(id) {
  await axios.delete(`${BASE_URL}/api/dreams/${id}`);
  return true;
}

export const getMotivationMessages = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/api/motivation/today/${userId}`);
  return data.messages;
};

export const triggerMotivationPush = async (userId, category) => {
  const { data } = await axios.post(`${BASE_URL}/api/motivation/trigger`, { userId, category });
  return data.message;
};
