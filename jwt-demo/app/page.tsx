'use client';

import React, { useState } from 'react';
import { encode_jwt, decode_jwt, validate_jwt } from '@yash112/jwt-library';

const secret = process.env.JWT_SECRET ?? '473195740299679db6424035957d49bbc932b05bd776cbb41d18a9737d529807';

const Page = () => {
  const [id, setId] = useState('');
  const [payload, setPayload] = useState('');
  const [ttl, setTtl] = useState('');
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

  const handleGenerate = () => {
    const token = encode_jwt(secret, id, JSON.parse(payload), parseInt(ttl));
    setToken(token);
  };

  const handleDecode = () => {
    try {
      const decoded = decode_jwt(secret, token);
      setDecoded(JSON.stringify(decoded, null, 2));
    } catch (error) {
      setDecoded('Invalid token');
    }
  };

  const handleValidate = () => {
    const valid = validate_jwt(secret, token);
    setIsValid(valid);
  };

  const handleApiRequest = async () => {
    try {
      const response = await fetch('/api/secure', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApiResponse(JSON.stringify(data, null, 2));
      } else {
        setApiResponse('Unauthorized');
      }
    } catch (error) {
      setApiResponse('Error making request');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">JWT Demo - Yash Mangal</h1>

      <div className="mb-4">
        <label className="block mb-1">ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Payload</label>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">TTL (seconds)</label>
        <input
          type="number"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate JWT
        </button>
      </div>

      {token && (
        <div className="mb-4">
          <label className="block mb-1">Generated Token</label>
          <textarea value={token} readOnly className="border p-2 w-full" />
        </div>
      )}

      <div className="mb-4">
        <button onClick={handleDecode} className="bg-green-500 text-white px-4 py-2 rounded">
          Decode JWT
        </button>
      </div>

      {decoded && (
        <div className="mb-4">
          <label className="block mb-1">Decoded Token</label>
          <pre className="border p-2 w-full">{decoded}</pre>
        </div>
      )}

      <div className="mb-4">
        <button onClick={handleValidate} className="bg-purple-500 text-white px-4 py-2 rounded">
          Validate JWT
        </button>
      </div>

      {isValid && (
      <div className="mb-4 flex">
        <label className="block">Token Validity - </label>
        <label className='ml-2 font-medium'>{isValid ? 'Valid' : 'Invalid'}</label>
      </div>
      )}
      
      <div className="mb-4">
        <button onClick={handleApiRequest} className="bg-teal-500 text-white px-4 py-2 rounded">
          Test Secure API
        </button>
      </div>

      {apiResponse && (
        <div className="mb-4">
          <label className="block mb-1">API Response</label>
          <pre className="border p-2 w-full">{apiResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default Page;
