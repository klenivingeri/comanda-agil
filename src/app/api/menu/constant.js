const MASTER = [
  {
    title: "Inicio",
    path: "/home",
    icon: "IconCommand",
  },
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
    title: "Colaboradores",
    path: "/colaboradores",
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
  {
    title: "Ajuda",
    path: "/help",
    icon: "IconCommand",
  },
];

const ADMIN = [
  {
    title: "Inicio",
    path: "/home",
    icon: "IconCommand",
  },
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
  {
    title: "Ajuda",
    path: "/help",
    icon: "IconCommand",
  },
];

const MODERATOR = [
  {
    title: "Inicio",
    path: "/home",
    icon: "IconCommand",
  },
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
  {
    title: "Ajuda",
    path: "/help",
    icon: "IconCommand",
  },
];

const VIEWER = [
  {
    title: "Inicio",
    path: "/home",
    icon: "IconCommand",
  },
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
  {
    title: "Ajuda",
    path: "/help",
    icon: "IconCommand",
  },
];

export const menuItemsByRole = {
  MASTER,
  ADMIN,
  MODERATOR,
  VIEWER,
};
