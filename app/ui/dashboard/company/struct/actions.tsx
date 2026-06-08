'use server'

import {getCurrentUser} from "@/lib/auth";
import prisma from "@/lib/prisma";

export type DeptNode = {
    id: string;
    name: string;
    code: string | null;
};

export type DepartmentMember = {
    id: string;
    real_name: string;
    avatar: string;
    position: string | null;
    role_name: string | null;
};

export type DepartmentStructureData = {
    companyName: string;
    current: DeptNode;
    ancestors: DeptNode[];
    children: DeptNode[];
    members: DepartmentMember[];
};

export async function getDepartmentStructure(): Promise<DepartmentStructureData | null> {
    const user = await getCurrentUser();
    if (!user?.department_id) {
        return null;
    }

    const [company, departments, members] = await Promise.all([
        prisma.company.findUnique({
            where: {id: user.company_id},
            select: {name: true},
        }),
        prisma.department.findMany({
            where: {
                company_id: user.company_id,
                is_deleted: false,
                is_enable: true,
            },
            select: {
                id: true,
                name: true,
                code: true,
                parent_id: true,
                sort: true,
            },
            orderBy: {sort: "asc"},
        }),
        prisma.user.findMany({
            where: {
                company_id: user.company_id,
                department_id: user.department_id,
                is_deleted: false,
                is_enable: true,
            },
            select: {
                id: true,
                real_name: true,
                avatar: true,
                position: true,
                role_name: true,
            },
            orderBy: {real_name: "asc"},
        }),
    ]);

    const deptMap = new Map(departments.map((dept) => [dept.id, dept]));
    const current = deptMap.get(user.department_id);
    if (!current) {
        return null;
    }

    const ancestors: DeptNode[] = [];
    let cursor = current;
    while (cursor.parent_id) {
        const parent = deptMap.get(cursor.parent_id);
        if (!parent) {
            break;
        }
        ancestors.unshift({
            id: parent.id,
            name: parent.name,
            code: parent.code,
        });
        cursor = parent;
    }

    const children = departments
        .filter((dept) => dept.parent_id === current.id)
        .map((dept) => ({
            id: dept.id,
            name: dept.name,
            code: dept.code,
        }));

    return {
        companyName: company?.name ?? user.company_name ?? "公司",
        current: {
            id: current.id,
            name: current.name,
            code: current.code,
        },
        ancestors,
        children,
        members,
    };
}
