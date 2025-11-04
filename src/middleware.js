import { NextResponse } from "next/server";

function getStoreXTenant(request) {
  const cookieValue = request.cookies.get("x-tenant")?.value;
  let xTenant = { status: 200, message: "Valido" };

  if (!cookieValue) {
    xTenant.status = 401;
    xTenant.message = "x-tenant não encontrado";
    return xTenant;
  }

  return xTenant;
}

const protectedRoutes = [
  "/caixa",
  "/comandas",
  "/produto",
  "/promocoes",
  "/funcionarios",
  "/relatarios",
  "/configuracao",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const tenantData = getStoreXTenant(request);

  if (tenantData.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/caixa/:path*",
    "/comandas/:path*",
    "/produto/:path*",
    "/promocoes/:path*",
    "/funcionarios/:path*",
    "/relatarios/:path*",
    "/configuracao/:path*",
  ],
};
