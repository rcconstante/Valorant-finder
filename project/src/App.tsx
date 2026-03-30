import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  TrendingUp,
  DollarSign,
  Package,
  Activity,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, trend: 'up' },
    { label: 'Active Users', value: '2,345', change: '+12.5%', icon: Users, trend: 'up' },
    { label: 'Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart, trend: 'up' },
    { label: 'Products', value: '567', change: '-2.4%', icon: Package, trend: 'down' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$250.00', status: 'Completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '$180.00', status: 'Processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Bob Johnson', amount: '$420.00', status: 'Completed', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Alice Brown', amount: '$320.00', status: 'Pending', date: '2024-01-14' },
    { id: '#ORD-005', customer: 'Charlie Wilson', amount: '$190.00', status: 'Completed', date: '2024-01-13' },
  ];

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Users', icon: Users, active: false },
    { name: 'Orders', icon: ShoppingCart, active: false },
    { name: 'Products', icon: Package, active: false },
    { name: 'Analytics', icon: Activity, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Dashboard</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : ''}`}>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-slate-600">JD</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-slate-700">John Doe</div>
                  <div className="text-xs text-slate-500">Admin</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
