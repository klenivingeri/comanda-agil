import { NextResponse } from "next/server";
import { menuItemsByRole } from "./app/api/menu/constant.js";

/**
 * Verifica se um usuário tem permissão para acessar uma rota com base em sua role.
 * @param {string} role - A role do usuário (ex: 'ADMIN', 'MASTER').
 * @param {string} pathname - A rota que o usuário está tentando acessar.
 * @returns {boolean} - Retorna true se o usuário tiver permissão, senão false.
 */
function hasPermission(role, pathname) {
  const allowedRoutes = menuItemsByRole[role];

  if (!allowedRoutes) {
    return false;
  }

  // Rotas que são permitidas para todos os usuários logados, independentemente da role.
  const commonRoutes = ["/home", "/help", "/configuracao"];
  if (commonRoutes.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // Verifica as rotas principais e as sub-rotas
  return allowedRoutes.some((route) => {
    if (pathname.startsWith(route.path)) {
      // Se a rota principal já corresponde, verifica se há sub-rotas
      if (route.sublink && route.sublink.length > 0) {
        // O usuário tem acesso à raiz da seção (ex: /produto),
        // então qualquer sub-rota também é permitida.
        return true;
      }
      // Se não há sub-rotas, a correspondência exata do path é suficiente
      return pathname.startsWith(route.path);
    }
    return false;
  });
}

function getStoreXTenant(request) {
  const cookieValue = request.cookies.get("x-tenant")?.value;

  if (!cookieValue) {
    return { status: 401, message: "x-tenant não encontrado", role: null };
  }

  const parts = cookieValue.split(".");
  // O cookie deve ter 6 partes: [tenantId, userId, role, timestamp, nonce, signature]
  if (parts.length < 3) {
    return { status: 401, message: "x-tenant inválido", role: null };
  }

  const role = parts[2];
  return { status: 200, message: "Válido", role };
}

const protectedRoutes = [
  "/home",
  "/help",
  "/caixa",
  "/empresa",
  "/produto",
  "/comandas",
  "/categoria",
  "/promocoes",
  "/relatarios",
  "/configuracao",
  "/colaboradores",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const tenantData = getStoreXTenant(request);
  const isAuthenticated = tenantData.status === 200;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se o usuário está autenticado e na página inicial, redireciona para /home
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Se a rota não é protegida, permite o acesso
  if (!isProtected) {
    return NextResponse.next();
  }

  // Se a rota é protegida, mas o usuário não está autenticado, redireciona para o login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // Opcional: informa de onde o usuário veio
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário está autenticado, verifica se ele tem permissão para a rota
  const userHasPermission = hasPermission(tenantData.role, pathname);

  if (!userHasPermission) {
    // Se não tiver permissão, redireciona para a página de não encontrado
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // Se chegou até aqui, o usuário está autenticado e tem permissão.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, exceto as que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (ícone)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/home",
    "/help",
    "/empresa",
    "/relatarios",
    "/configuracao",
    "/produto/:path*",
    "/comandas/:path*",
    "/categoria/:path*",
    "/promocoes/:path*",
    "/configuracao/:path*",
    "/colaboradores/:path*",
  ],
};
