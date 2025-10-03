#!/usr/bin/env node

/**
 * Test script to verify if wildcard DNS record is working
 */

import { promises as dns } from 'dns';

async function testDNS() {
    const testSubdomain = `test-${Date.now()}.geminicode.ai`;
    
    try {
        console.log(`🔍 Testing DNS resolution for: ${testSubdomain}`);
        
        const result = await dns.resolve4(testSubdomain);
        console.log(`✅ DNS resolution successful!`);
        console.log(`📋 IP addresses: ${result.join(', ')}`);
        console.log(`🎯 Wildcard DNS record is working correctly!`);
        
    } catch (error) {
        if (error.code === 'ENOTFOUND') {
            console.log(`❌ DNS resolution failed: ${error.message}`);
            console.log(`💡 This means the wildcard DNS record hasn't been added yet.`);
            console.log(`📝 Please add the DNS record manually in Cloudflare dashboard.`);
        } else {
            console.log(`❌ DNS error: ${error.message}`);
        }
    }
}

// Run the test
testDNS();
