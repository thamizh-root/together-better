import fetch from 'node-fetch'; // if Node <18, otherwise native fetch available

async function getAccessToken(clientId, clientSecret) {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'openid',
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch('https://api.olamaps.io/auth/v1/token', {
    method: 'POST',
    body: params,
  });
  const data = await response.json();
  return data.access_token;
}

async function autocompletePlaces(accessToken, searchText) {
  const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(searchText)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
}

async function main() {
  const clientId = 'c9b33fca-81a3-419a-a574-9c7d81c69730';      // Replace with actual client id
  const clientSecret = '1759e98821c84ae5b16ece7230935913';  // Replace with actual client secret
  const searchText = 'villupuram'; // Replace with your search query

  const token = await getAccessToken(clientId, clientSecret);
  console.log('Access Token:', token);

  const places = await autocompletePlaces(token, searchText);
  console.log('Autocomplete Results:', places);
}

main().catch(console.error);
