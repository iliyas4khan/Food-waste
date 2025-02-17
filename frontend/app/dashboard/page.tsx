import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
      </header>
      <main className="grid gap-6 md:grid-cols-2">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Hello, User!</h2>
          <p className="text-gray-600">We're glad to see you here. This is your personal dashboard where you can manage your account and access key features.</p>
        </section>
        {/* <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Profile</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Settings</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Messages</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Analytics</a></li>
          </ul>
        </section> */}
      </main>
    </div>
  );
};

export default Dashboard;