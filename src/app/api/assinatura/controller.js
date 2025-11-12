import { MercadoPagoConfig, PreApproval } from "mercadopago";

const MERCADOPAGO = process.env.COOKIE_SECRET_MERCADOPAGO;

export const postSign = async ({ tenants, xTenant }) => {
  try {
    if (!MERCADOPAGO) {
      throw new Error(
        "ACCESS_TOKEN do Mercado Pago não encontrado nas variáveis de ambiente."
      );
    }

    const client = new MercadoPagoConfig({
      accessToken: MERCADOPAGO,
      options: { timeout: 5000 },
    });

    const preapproval = new PreApproval(client);

    const assinatura = await preapproval.create({
      body: {
        reason: "Assinatura ComandaGo - 5 colaboradores",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 16.99, // valor variável
          currency_id: "BRL",
        },
        back_url: "https://www.comandago.com.br/assinatura", // onde o usuário volta
        payer_email: "cliente@example.com",
        external_reference: "USER_123", // <== seu id interno
      },
    });

    return Response.json(
      {
        success: true,
        message: "Planos de assinatura buscados com sucesso.",
        records: [assinatura],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro ao criar o Plano de Assinatura:", error.message);

    if (error.status && error.cause) {
      console.error("Status HTTP:", error.status);
      console.error(
        "Detalhes do Erro da API:",
        JSON.stringify(error.cause, null, 2)
      );
    }

    throw error;
  }
};

export const getSign = async (req, res) => {
  const mp = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const preapproval = new PreApproval(mp);

  // Busca todas as assinaturas do plano OU do cliente
  const assinaturas = await preapproval.search({
    options: {
      qs: {
        payer_email: req.query.emailDoCliente, // se tiver
        external_reference: req.query.userId,  // se você tiver salvo
      },
    },
  });

  if (assinaturas.results.length > 0) {
    const assinatura = assinaturas.results[0];

    // Salvar no banco
    // exemplo: prisma.assinaturas.create({ data: { ...assinatura } });

    res.status(200).json({
      message: "Assinatura confirmada!",
      assinatura,
    });
  } else {
    res.status(404).json({ message: "Nenhuma assinatura encontrada." });
  }
}








// import { MercadoPagoConfig, PreApprovalPlan } from "mercadopago"; // ⬅️ Remove PreApproval

// const MERCADOPAGO = process.env.COOKIE_SECRET_MERCADOPAGO;

// export const getSign = async ({ tenants, xTenant }) => {
//   try {
//     const client = new MercadoPagoConfig({
//       accessToken: MERCADOPAGO,
//       options: { timeout: 5000 },
//     });

//     // 🎯 Use a classe PreApprovalPlan para buscar os PLANOS
//     const preApprovalPlan = new PreApprovalPlan(client);

//     const filters = {
//         status: 'active'
//     };

//     // Passe o objeto de filtros para o método search()
//     const plans = await preApprovalPlan.search({ filters: filters });

//     // O retorno de 'plans' agora terá os templates de planos, não assinaturas ativas.
//     return Response.json(
//       {
//         success: true,
//         message: "Planos de assinatura buscados com sucesso.",
//         records: plans?.results || [],
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erro ao buscar planos de assinatura:", error);
//     return Response.json({ success: false, message: "Erro ao buscar planos de assinatura." }, { status: 500 });
//   }
// };
