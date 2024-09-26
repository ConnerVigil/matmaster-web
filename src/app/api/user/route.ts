import { PostgresDBDAOFactory } from "@/lib/backend/daoPackages/postgresDBDAO/postgresDBDAOFactory";
import { UserService } from "@/lib/backend/services/userService";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const userService = new UserService(new PostgresDBDAOFactory());
    const user = await userService.getUser("123");
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const userService = new UserService(new PostgresDBDAOFactory());
    const { firstName, lastName } = await request.json();
    const user = await userService.createUser(firstName, lastName);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
