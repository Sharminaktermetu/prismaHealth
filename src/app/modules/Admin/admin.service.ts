import { Prisma } from "@prisma/client";
import { adminSearchFields } from "./admin.constant";
import pagination from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma";

const getAllAdmins = async (params: any, options: any) => {
  const { page, limit, skip } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.orderBy
        ? {
            [options.sortBy]: options.orderBy,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  
  return {
    meta: {
      total,
      page,
      limit,
    },

    data: result,
  };
};

export const adminServices = {
  getAllAdmins,
};
