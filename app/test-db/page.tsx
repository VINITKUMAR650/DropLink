'use client';

import { useState, useEffect } from 'react';

export default function TestDbPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTest = async () => {
      try {
        const response = await fetch('/api/test-db');
        const data = await response.json();
        setTestResults(data);
      } catch (error) {
        setTestResults({ error: 'Failed to connect to test API' });
      } finally {
        setLoading(false);
      }
    };

    runTest();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Running database tests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Database & Storage Test Results</h1>
      
      {testResults?.error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error</h2>
          <p>{testResults.error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Database Tests</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Users Table:</span> 
                <span className={`ml-2 ${testResults?.results?.database?.usersTable === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults?.results?.database?.usersTable}
                </span>
              </div>
              <div>
                <span className="font-medium">Files Table:</span> 
                <span className={`ml-2 ${testResults?.results?.database?.filesTable === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults?.results?.database?.filesTable}
                </span>
              </div>
              <div>
                <span className="font-medium">Overall Connection:</span> 
                <span className={`ml-2 ${testResults?.results?.database?.connection === 'Successful' ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults?.results?.database?.connection}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Storage Tests</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Available Buckets:</span> 
                <span className="ml-2">
                  {testResults?.results?.storage?.buckets?.join(', ') || 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium">Uploads Bucket:</span> 
                <span className={`ml-2 ${testResults?.results?.storage?.uploadsBucket === 'Found' ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults?.results?.storage?.uploadsBucket}
                </span>
              </div>
              <div>
                <span className="font-medium">Storage Connection:</span> 
                <span className={`ml-2 ${testResults?.results?.storage?.connection === 'Successful' ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults?.results?.storage?.connection}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">Next Steps</h3>
            {testResults?.success ? (
              <p className="text-blue-700">
                Everything looks good! You should now be able to upload files without errors.
              </p>
            ) : (
              <div className="text-blue-700">
                <p>Some issues were detected. Please check:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Ensure you've run the database schema from <code>supabase-schema.sql</code></li>
                  <li>Verify your Supabase credentials in <code>.env.local</code></li>
                  <li>Check that you've created the 'uploads' storage bucket</li>
                  <li>Make sure the 'uploads' bucket is set to public</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}