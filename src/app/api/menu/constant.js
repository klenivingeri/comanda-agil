const ADMIN = [
  {
    title: "Comandas",
    path: "/comandas",
    icon: "IconCommand",
  },
  {
    title: "Categoria",
    path: "/categoria",
    icon: "IconShoppingCart",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Produto",
    path: "/produto",
    icon: "IconShoppingCart",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Promoções",
    path: "/promocoes",
    icon: "IconPercent",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Funcionários",
    path: "/funcionarios",
    icon: "IconUsers",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Relatórios",
    path: "/relatorios",
    icon: "IconGraphic",
  },
  {
    title: "Empresa",
    path: "/empresa",
    icon: "IconCompany",
  },
  {
    title: "Configuração",
    path: "/configuracao",
    icon: "IconGear",
  },
];

const EDITOR = [
  {
    title: "Comandas",
    path: "/comandas",
    icon: "IconCommand",
  },
  {
    title: "Categoria",
    path: "/categoria",
    icon: "IconShoppingCart",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Produto",
    path: "/produto",
    icon: "IconShoppingCart",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Promoções",
    path: "/promocoes",
    icon: "IconPercent",
    sublink: [
      {
        title: "Cadastrar",
        path: "/cadastrar/create",
        icon: "IconCreate",
      },
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
      {
        title: "Relatório",
        path: "/relatorio",
        icon: "IconChart",
      },
    ],
  },
  {
    title: "Relatórios",
    path: "/relatorios",
    icon: "IconGraphic",
  },
  {
    title: "Configuração",
    path: "/configuracao",
    icon: "IconGear",
  },
];

const MODERATOR = [
  {
    title: "Comandas",
    path: "/comandas",
    icon: "IconCommand",
  },
  {
    title: "Categoria",
    path: "/categoria",
    icon: "IconShoppingCart",
    sublink: [
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
    ],
  },
  {
    title: "Produto",
    path: "/produto",
    icon: "IconShoppingCart",
    sublink: [
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
    ],
  },
  {
    title: "Promoções",
    path: "/promocoes",
    icon: "IconPercent",
    sublink: [
      {
        title: "Consultar",
        path: "/consultar",
        icon: "IconSearch",
      },
    ],
  },
  {
    title: "Configuração",
    path: "/configuracao",
    icon: "IconGear",
  },
];

const VIEWER = [
  {
    title: "Comandas",
    path: "/comandas",
    icon: "IconCommand",
  },
  {
    title: "Configuração",
    path: "/configuracao",
    icon: "IconGear",
  },
];

export const menuItemsByRole = {
  ADMIN,
  EDITOR,
  MODERATOR,
  VIEWER,
};
