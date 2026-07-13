import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, CheckCircle2, Circle, Clock, MapPin, Package, CreditCard, User } from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/mockData/transactions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const STATUS_VARIANTS: Record<string, "success" | "warning" | "error" | "neutral"> = {
  completed: "success",
  pending: "warning",
  cancelled: "error",
  refunded: "neutral",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const transaction = MOCK_TRANSACTIONS.find((t) => t.id === id);

  if (!transaction) {
    notFound();
  }

  // Mocked details not present in the base transaction
  const billingAddress = {
    street: "123 Main St",
    city: "Metropolis",
    state: "NY",
    zip: "10001",
    country: "USA",
  };

  const purchasedItems = [
    { id: 1, name: "Premium Subscription - 1 Year", qty: 1, price: transaction.amount * 0.8 },
    { id: 2, name: "Setup Fee", qty: 1, price: transaction.amount * 0.2 },
  ];

  const subtotal = transaction.amount;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const timeline = [
    { status: "Order Placed", date: transaction.date + " 10:00 AM", completed: true },
    { status: "Payment Processed", date: transaction.date + " 10:05 AM", completed: transaction.status !== "cancelled" },
    { status: "Completed", date: transaction.date + " 10:30 AM", completed: transaction.status === "completed" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-surface-500 dark:text-surface-400 space-x-2">
            <Link href="/dashboard" className="hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            <ChevronRight size={14} />
            <Link href="/dashboard" className="hover:text-primary-600 transition-colors">
              Transactions
            </Link>
            <ChevronRight size={14} />
            <span className="text-surface-900 dark:text-surface-100 font-medium">
              {transaction.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-3">
            Transaction Details
            <Badge variant={STATUS_VARIANTS[transaction.status]} className="capitalize text-sm">
              {transaction.status}
            </Badge>
          </h1>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] border-2 border-primary-500 text-primary-500 hover:bg-primary-500/5 h-11 px-6 text-sm gap-2"
        >
          <ArrowLeft size={16} />
          <span>Back to Transactions</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={18} className="text-primary-500" />
                Purchased Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <THead>
                    <Tr>
                      <Th>Item Description</Th>
                      <Th className="text-right">Qty</Th>
                      <Th className="text-right">Unit Price</Th>
                      <Th className="text-right">Total</Th>
                    </Tr>
                  </THead>
                  <TBody>
                    {purchasedItems.map((item) => (
                      <Tr key={item.id}>
                        <Td className="font-medium text-surface-900 dark:text-surface-100">
                          {item.name}
                        </Td>
                        <Td className="text-right">{item.qty}</Td>
                        <Td className="text-right">{currencyFormatter.format(item.price)}</Td>
                        <Td className="text-right font-semibold">
                          {currencyFormatter.format(item.price * item.qty)}
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
              </div>

              {/* Order Summary */}
              <div className="mt-6 flex justify-end">
                <div className="w-full sm:w-1/2 space-y-3 text-sm">
                  <div className="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Subtotal</span>
                    <span>{currencyFormatter.format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Tax (10%)</span>
                    <span>{currencyFormatter.format(tax)}</span>
                  </div>
                  <div className="border-t border-surface-200 dark:border-surface-700 pt-3 flex justify-between font-bold text-lg text-surface-900 dark:text-white">
                    <span>Total</span>
                    <span>{currencyFormatter.format(total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={18} className="text-primary-500" />
                Transaction Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-200 dark:before:via-surface-700 before:to-transparent">
                {timeline.map((event, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-surface-900 bg-surface-100 dark:bg-surface-800 text-surface-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      {event.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-surface-300 dark:text-surface-600" />
                      )}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface-50 dark:bg-surface-800/50 p-4 rounded border border-surface-200 dark:border-surface-700 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-surface-900 dark:text-white">{event.status}</div>
                      </div>
                      <div className="text-sm text-surface-500">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Side Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} className="text-primary-500" />
                Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-surface-500 mb-1">Name</p>
                <p className="font-medium text-surface-900 dark:text-white">{transaction.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-surface-500 mb-1">Email</p>
                <p className="font-medium text-surface-900 dark:text-white">{transaction.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-surface-500 mb-1">Customer ID</p>
                <p className="font-mono text-sm text-surface-900 dark:text-white">{transaction.customerId}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={18} className="text-primary-500" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-surface-500 mb-1">Method</p>
                <p className="font-medium capitalize text-surface-900 dark:text-white">
                  {transaction.method.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-surface-500 mb-1">Transaction ID</p>
                <p className="font-mono text-sm text-surface-900 dark:text-white">{transaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-surface-500 mb-1">Date</p>
                <p className="font-medium text-surface-900 dark:text-white">{transaction.date}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={18} className="text-primary-500" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-surface-700 dark:text-surface-300 space-y-1">
                <p>{billingAddress.street}</p>
                <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
                <p>{billingAddress.country}</p>
              </address>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
