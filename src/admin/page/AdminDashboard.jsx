import {
  BadgeIndianRupeeIcon,
  PackageOpen,
  ShoppingBasketIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../../../services/api";
import useFetchProducts from "../../hooks/useFetchProducts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const { products } = useFetchProducts("/product");
  const data = [];
  useEffect(() => {
    api
      .get(`/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Failed to fetch users:", error));

    api
      .get(`/orders`)
      .then((response) => setOrders(response.data))
      .catch((error) => console.log("Failed to fetch orders:", error));

    if (products?.length > 0) {
      const sorted = [...products]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
      setTopProducts(sorted);
    }
  }, [products]);

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const existing = data.find((d) => d.month === order.month);

      if (existing) {
        existing[item.category] =
          (existing[item.category] || 0) + order.totalAmount;
        existing.totalAmount = (existing.totalAmount || 0) + order.totalAmount;
      } else {
        const newEntry = { month: order.month, totalAmount: order.totalAmount };
        newEntry[item.category] = order.totalAmount;
        data.push(newEntry);
      }
    });
  });

  const length = orders.map((order) => {
    return order.items.length;
  });
  const totalOrder = length.reduce((a, b) => a + b, 0);

  const totalSales = orders.map((order) => {
    return order.totalAmount;
  });

  const totalAmount = totalSales.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-slate-200/40 p-4 rounded-lg ">
      <div className="w-full grid grid-cols-1 gap-4 mt-4 xl:grid-cols-4">
        <div className="flex gap-2 bg-white p-4 rounded-sm shadow">
          <div className="flex justify-center items-center bg-violet-300/30 h-20 w-20 rounded-md">
            <UsersIcon className="h-10 text-violet-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">
              <CountUp start={0} end={users.length} duration={2} />+
            </p>
            <p className="text-sm text-gray-700 capitalize">Total Customers</p>
          </div>
        </div>
        <div className="flex gap-2 bg-white p-4 rounded-sm shadow">
          <div className="flex justify-center items-center bg-yellow-300/30 h-20 w-20 rounded-md">
            <ShoppingBasketIcon className="h-10 text-yellow-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">
              <CountUp start={0} end={products.length} duration={2} />+
            </p>
            <p className="text-sm text-gray-700 capitalize">Total products</p>
          </div>
        </div>
        <div className="flex gap-2 bg-white p-4 rounded-sm shadow">
          <div className="flex justify-center items-center bg-green-300/30 h-20 w-20 rounded-md">
            <PackageOpen className="h-10 text-green-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">
              <CountUp start={0} end={totalOrder} duration={2} />+
            </p>
            <p className="text-sm text-gray-700 capitalize">Total orders</p>
          </div>
        </div>
        <div className="flex gap-2 bg-white p-4 rounded-sm shadow">
          <div className="flex justify-center items-center bg-red-300/30 h-20 w-20 rounded-md">
            <BadgeIndianRupeeIcon className="h-10 text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">
              <CountUp start={0} end={totalAmount} duration={2} />+
            </p>
            <p className="text-sm text-gray-700 capitalize">Total sales</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="bg-white p-4 rounded-sm shadow xl:col-span-2 h-[400px] w-full border border-[#006350] bg-[#006350]/10">
          <h1 className="text-xl font-semibold capitalize text-center text-[#006350]">Sales chart</h1>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="month" tickLine={false} tick={{ fill: "#006350", fontSize: 12 }}/>
              <YAxis tickLine={false} tick={{ fill: "#006350", fontSize: 12 }}/>
              <Tooltip />

              {/* Category-wise Areas */}
              <Area
                type="monotone"
                dataKey="Laptops"
                stroke="#5e81ff"
                fill="#5e81ff"
              />
              <Area
                type="monotone"
                dataKey="headphones"
                stroke="#e9ff24"
                fill="#e9ff24"
              />
              <Area
                type="monotone"
                dataKey="smartphones"
                stroke="#24fffb"
                fill="#24fffb"
              />
              <Area
                type="monotone"
                dataKey="Watches"
                stroke="#ff24cc"
                fill="#ff24cc"
              />
              <Area
                type="monotone"
                dataKey="mobiles"
                stroke="#FF5733"
                fill="#FF5733"
              />

              {/* Total Amount Area */}
              <Area
                type="monotone"
                dataKey="totalAmount"
                stroke="#ff6817"
                fill="#ff6817"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-sm shadow h-[400px] border border-[#7db81f] bg-[#7db81f]/10">
          <h1 className="text-xl font-semibold capitalize text-center text-[#3d6300]">
            top sold products
          </h1>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topProducts}
              layout="vertical"
              axisLine={false}
              tickLine={false}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#3d6300", fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="sales" fill="#7db81f" barSize={15} />
            </BarChart>
          </ResponsiveContainer>
          {/* <BarChart data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
