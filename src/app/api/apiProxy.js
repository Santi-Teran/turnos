// pages/api/apiProxy.js
import https from "https";

export default async function handler(req, res) {
  const { method, headers, body } = req;
  const targetUrl = `http://190.245.254.248:8081/api${req.url}`;

  const options = {
    method,
    headers: { ...headers, host: "190.245.254.248" },
  };

  const proxyReq = https.request(targetUrl, options, (proxyRes) => {
    let data = "";
    proxyRes.on("data", (chunk) => (data += chunk));
    proxyRes.on("end", () => res.status(proxyRes.statusCode).send(data));
  });

  proxyReq.on("error", (err) => res.status(500).json({ error: err.message }));
  proxyReq.write(body || "");
  proxyReq.end();
}
