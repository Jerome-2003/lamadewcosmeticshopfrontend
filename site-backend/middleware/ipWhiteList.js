// middleware/ipWhitelist.js

// Hardcoded array list: You can always add trusted IPs here manually
const HARDCODED_ALLOWED_IPS = [
  '127.0.0.1',      // Localhost (IPv4)
  '::1',            // Localhost (IPv6)
  '193.186.4.90'    // Admin IP
];

function ipWhitelist(req, res, next) {
  // Capture client IP, tracking standard headers used by cloud hosts (Render, AWS, Heroku)
  let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (clientIp && clientIp.includes(',')) {
    clientIp = clientIp.split(',')[0].trim();
  }

  // Normalize IPv6 mapped IPv4 addresses
  if (clientIp && clientIp.startsWith('::ffff:')) {
    clientIp = clientIp.substring(7);
  }

  // Read any extra IPs provided inside the .env configuration file
  const envIps = process.env.ALLOWED_IPS 
    ? process.env.ALLOWED_IPS.split(',').map(ip => ip.trim().replace(/\r/g, '')) 
    : [];

  const totalWhitelist = [...HARDCODED_ALLOWED_IPS, ...envIps];

  // Block any requests from IPs not explicitly listed
  if (!totalWhitelist.includes(clientIp)) {
    console.warn(`[SECURITY ALERT] Unauthorized admin access attempt blocked from IP: ${clientIp}`);
    return res.status(403).json({ error: 'Access denied: Your IP is not whitelisted to access the admin panel.' });
  }

  next();
}

module.exports = ipWhitelist;