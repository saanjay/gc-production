#!/usr/bin/env node

/**
 * Script to add wildcard DNS record for geminicode.ai using API Key + Email
 * This will resolve the net::ERR_NAME_NOT_RESOLVED errors for preview subdomains
 */

const API_KEY = "b569537e532ed52491a7767266192c681e6b5";
const EMAIL = "saanjay.jain@gmail.com"; // Your email from the logs
const ZONE_ID = "db01fac4261b2604aacad8410443a3e2"; // From wrangler.jsonc
const DOMAIN = "geminicode.ai";

async function addWildcardDNSRecord() {
    try {
        console.log("🌐 Adding wildcard DNS record for geminicode.ai...");
        console.log(`📧 Using email: ${EMAIL}`);
        
        // Check if wildcard record already exists
        const existingRecords = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=*.${DOMAIN}`, {
            headers: {
                'X-Auth-Email': EMAIL,
                'X-Auth-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        const existingData = await existingRecords.json();
        
        if (existingData.success && existingData.result.length > 0) {
            console.log("✅ Wildcard DNS record already exists!");
            console.log("📋 Existing records:");
            existingData.result.forEach(record => {
                console.log(`   - ${record.name} (${record.type}) -> ${record.content} (Proxied: ${record.proxied})`);
            });
            return;
        }
        
        // Add wildcard A record
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
            method: 'POST',
            headers: {
                'X-Auth-Email': EMAIL,
                'X-Auth-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'A',
                name: '*',
                content: '192.0.2.1', // Dummy IP - Workers will handle routing
                ttl: 1, // Auto TTL
                proxied: true // Enable Cloudflare proxy (orange cloud)
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log("✅ Wildcard DNS record added successfully!");
            console.log(`📋 Record: *.${DOMAIN} -> ${data.result.content} (Proxied: ${data.result.proxied})`);
            console.log("🎯 Preview subdomains should now resolve correctly!");
            console.log("⏱️  DNS propagation may take 1-5 minutes...");
        } else {
            console.error("❌ Failed to add DNS record:");
            console.error(JSON.stringify(data.errors, null, 2));
        }
        
    } catch (error) {
        console.error("❌ Error adding DNS record:", error.message);
    }
}

// Run the script
addWildcardDNSRecord();
