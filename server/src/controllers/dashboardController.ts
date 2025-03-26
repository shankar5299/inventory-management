import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const purchasesSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const expensesSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const expenseByCategorySummaryRow = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );

    const expensesByCategorySummary = expenseByCategorySummaryRow.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );
    res.json({
      popularProducts,
      salesSummary,
      purchasesSummary,
      expensesSummary,
      expensesByCategorySummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard matrics" });
  }
};
