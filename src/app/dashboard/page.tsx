"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Mock data generators
const generateSalesData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: format(date, "MMM dd"),
      revenue: Math.floor(Math.random() * 5000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
      customers: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
};

const generateProductData = () => [
  { name: "Electronics", value: 35, color: "#0088FE" },
  { name: "Clothing", value: 25, color: "#00C49F" },
  { name: "Books", value: 20, color: "#FFBB28" },
  { name: "Home & Garden", value: 15, color: "#FF8042" },
  { name: "Sports", value: 5, color: "#8884D8" },
];

const generateRawData = (count: number) => {
  const statuses = ["completed", "pending", "cancelled"];
  const products = [
    "iPhone 15",
    "MacBook Pro",
    "AirPods",
    "iPad",
    "Apple Watch",
    "Samsung Galaxy",
    "Dell Laptop",
  ];
  const customers = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "Diana Davis",
    "Eve Miller",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `ORD-${String(i + 1).padStart(4, "0")}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    product: products[Math.floor(Math.random() * products.length)],
    amount: Math.floor(Math.random() * 2000) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: format(
      new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      "MMM dd, yyyy",
    ),
  }));
};

export default function SalesDashboard() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [timeframe, setTimeframe] = useState("30");
  const [salesData, setSalesData] = useState(generateSalesData(30));
  const [productData, setProductData] = useState(generateProductData());
  const [rawData, setRawData] = useState(generateRawData(50));
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals from sales data
  const totals = {
    revenue: salesData.reduce((sum, day) => sum + day.revenue, 0),
    orders: salesData.reduce((sum, day) => sum + day.orders, 0),
    customers: salesData.reduce((sum, day) => sum + day.customers, 0),
    avgOrderValue:
      salesData.reduce((sum, day) => sum + day.revenue, 0) /
      salesData.reduce((sum, day) => sum + day.orders, 0),
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 6000));

    const days = Number.parseInt(timeframe);
    setSalesData(generateSalesData(days));
    setProductData(generateProductData());
    setRawData(generateRawData(50));
    setIsLoading(false);
  };

  useEffect(() => {
    const days = Number.parseInt(timeframe);
    setSalesData(generateSalesData(days));
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#e7e7e7] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sales Dashboard
            </h1>
            <p className="text-gray-600">
              Track your sales performance and analytics
            </p>
          </div>

          <div className="flex w-full flex-row justify-end gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={refreshData}
              disabled={isLoading}
              variant="outline"
            >
              <RefreshCw
                className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Section 1: Totals */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totals.revenue.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                +12.5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totals.orders.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                +8.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Customers
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totals.customers.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                +15.3% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Order Value
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totals.avgOrderValue.toFixed(0)}
              </div>
              <p className="text-muted-foreground text-xs">
                +4.1% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section 2: Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>
                Daily revenue over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px] max-w-full p-0"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-revenue)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders vs Customers</CardTitle>
              <CardDescription>Daily orders and new customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  orders: {
                    label: "Orders",
                    color: "hsl(var(--chart-2))",
                  },
                  customers: {
                    label: "Customers",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px] max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="var(--color-orders)" />
                    <Bar dataKey="customers" fill="var(--color-customers)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>
                Revenue distribution across product categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Sales %",
                      },
                    }}
                    className="h-[300px] max-w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="w-full space-y-4 lg:w-1/2">
                  {productData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Raw Data */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest sales transactions and order details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rawData.slice(0, 10).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>${order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => setRawData(generateRawData(50))}
              >
                Load More Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
