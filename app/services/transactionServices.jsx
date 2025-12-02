import axios from "axios";

const API_BASE = "https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io";

export const getTransactions = async (userId) => {
  const { data } = await axios.get(`${API_BASE}/api/plaid/access-token?userId=${userId}`);
  const accessToken = data.accessToken;

  await axios.post(`${API_BASE}/api/plaid/fetch-transactions`, {
    accessToken,
    userId,
    skipDuplicateCheck: true,
  });

  const res = await axios.get(`${API_BASE}/transactions/by-user/${userId}`);
  return res.data.transactions;
};

