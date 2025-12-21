import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  // Log all headers for debugging
  console.log("=== IP Debug Information ===");
  console.log("All headers:");
  for (const [key, value] of request.headers.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  // Specific headers we're interested in
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const xRealIp = request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");
  
  console.log("\n=== Specific Headers ===");
  console.log("x-forwarded-for:", xForwardedFor);
  console.log("cf-connecting-ip:", cfConnectingIp);
  console.log("x-real-ip:", xRealIp);
  console.log("user-agent:", userAgent);
  
  // Try to extract IP
  let detectedIP = "Not detected";
  
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map(ip => ip.trim());
    console.log("IPs from x-forwarded-for:", ips);
    
    // Find first non-local IP
    for (const ipWithPort of ips) {
      const ip = ipWithPort.split(":")[0];
      if (ip && !isLocalIP(ip)) {
        detectedIP = ip;
        break;
      }
    }
  }
  
  // Try other headers if x-forwarded-for didn't work
  if (detectedIP === "Not detected") {
    const alternativeHeaders = [cfConnectingIp, xRealIp];
    for (const ip of alternativeHeaders) {
      if (ip && !isLocalIP(ip)) {
        detectedIP = ip;
        break;
      }
    }
  }
  
  console.log("Final detected IP:", detectedIP);
  
  // Return detailed information
  return new Response(
    JSON.stringify({
      headers: {
        "x-forwarded-for": xForwardedFor,
        "cf-connecting-ip": cfConnectingIp,
        "x-real-ip": xRealIp,
        "user-agent": userAgent
      },
      detectedIP: detectedIP,
      timestamp: new Date().toISOString(),
      message: "Check the server logs for detailed debugging information"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
};

// Helper function to check if an IP is local
function isLocalIP(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("::ffff:127.0.0.1") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.") ||
    ip.startsWith("192.168.")
  );
}