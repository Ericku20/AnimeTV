/**
 * Script de prueba para Anime1v API
 * Ejecutar: npx tsx test-api.ts
 */

import axios from 'axios';

const API_BASE = 'https://api.anime1.com';
const client = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
});

async function testAPI() {
  console.log('🧪 Testing Anime1v API\n');
  console.log(`📍 Base URL: ${API_BASE}\n`);

  try {
    // Test 1: Búsqueda
    console.log('1️⃣  Testing /search endpoint...');
    const searchRes = await client.get('/search?q=naruto&page=1');
    console.log('✅ Search works!');
    console.log(`   Found results: ${searchRes.data.results?.length || searchRes.data.data?.length || 0}\n`);

    // Test 2: Popular
    console.log('2️⃣  Testing /popular endpoint...');
    const popularRes = await client.get('/popular?page=1');
    console.log('✅ Popular works!');
    console.log(`   Found anime: ${popularRes.data.results?.length || popularRes.data.data?.length || 0}\n`);

    // Test 3: Recent
    console.log('3️⃣  Testing /recent endpoint...');
    const recentRes = await client.get('/recent?page=1');
    console.log('✅ Recent works!');
    console.log(`   Found anime: ${recentRes.data.results?.length || recentRes.data.data?.length || 0}\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ API is responding correctly!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Show sample response structure
    console.log('📋 Sample response structure:');
    console.log(JSON.stringify(searchRes.data, null, 2).slice(0, 500) + '...\n');
  } catch (error: any) {
    console.error('❌ API Error:');
    console.error(`   ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data: ${JSON.stringify(error.response.data).slice(0, 200)}`);
    }
  }
}

testAPI();
