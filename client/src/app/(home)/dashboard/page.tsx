"use client";

import { CardExpensesSummary } from "@/components/dashboard-component/cardExpensesSummary";
import CardPopularProducts from "@/components/dashboard-component/cardPopularProducts";
import CardPurchaseSummary from "@/components/dashboard-component/cardPurchasesSummary";
import CardSalesSummary from "@/components/dashboard-component/cardSalesSummary";
import { StatCard } from "@/components/dashboard-component/statCard";
import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";

const DashBoard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">            <CardPopularProducts />
            <CardSalesSummary />
            <CardPurchaseSummary />
            <CardExpensesSummary />
            <StatCard
                dateRange="22 -29 October 2024"
                title="Customer & Expenses"
                primaryIcon={<Package className="size-6 text-blue-600" />}
                details={[
                    {
                        title: "Customer Growth",
                        amount: "175.00",
                        changePercentage: 131,
                        IconComponents: TrendingUp
                    },
                    {
                        title: "Expenses",
                        amount: "10.00",
                        changePercentage: -56,
                        IconComponents: TrendingDown
                    }
                ]}
            />

            <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            IconComponents: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147",
            changePercentage: -56,
            IconComponents: TrendingDown,
          },
        ]}
      />

            <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            IconComponents: TrendingUp,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercentage: -10,
            IconComponents: TrendingDown,
          },
        ]}
      />
        </div>
    );
}

export default DashBoard;