import { ExpensesByCategorySummary, useGetDashboardMetricsQuery } from "@/app/state/api";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const colors = ["#00C49F", "#0088FE", "#FFBB28"]

type ExpenseSums = {
    [category: string]: number;
};

export const CardExpensesSummary = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
    const expensesSummary = dashboardMetrics?.expensesSummary[0];
    const expensesByCategorySummary = dashboardMetrics?.expensesByCategorySummary || [];

    const expenseSums = expensesByCategorySummary.reduce((acc: ExpenseSums, item: ExpensesByCategorySummary) => {
        const category = item.category + "Expenses";
        const amount = parseInt(item.amount, 10);
        if (!acc[category]) acc[category] = 0;
        acc[category] += amount;
        return acc;
    },
        {});

    const expensesCategories = Object.entries(expenseSums).map((name, value) => ({
        name, value
    }))

    const totalExpenses = expensesCategories.reduce((acc, category: { value: number }) => acc + category.value, 0)
    const formattedTotalExenses = totalExpenses.toFixed(2);
    return (
        <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                <div className="m-5">Loading...</div>
            ) : (
                <>
                    {/* HEADER */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
                            Expense Summary
                        </h2>
                        <hr />
                    </div>
                    {/* body */}
                    <div className="xl:flex justify-between pr-7">
                        {/* chart */}
                        <div className="relative basis-3/5">
                            <ResponsiveContainer width="100%" height={130}>
                                <PieChart>
                                    <Pie data={expensesCategories} innerRadius={50} outerRadius={60} fill="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%">
                                        {expensesCategories.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index % colors.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                                <span className="font-bold text-xl">
                                    ${formattedTotalExenses}
                                </span>
                            </div>
                        </div>
                        {/* labels */}
                        <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                            {expensesCategories.map((entry, index) => (
                                <li key={`legend-${index}`} className="flex items-center text-xs">
                                    <span className="mr-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}>
                                    </span>
                                    {entry.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* footer */}
                    <div>
                        <hr />
                        {expensesSummary && (
                            <div className=" mt-3 flex justify-between items-center px-7 pb-4">
                                <div className="pt-2">
                                    <p className="text-sm">
                                        Average:{" "}
                                        <span className="font-semibold">
                                            ${expensesSummary.totalExpenses.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <span className="flex items-center mt-2">
                                    <TrendingUp className=" mr-2 text-green-500" />
                                    30%
                                </span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}