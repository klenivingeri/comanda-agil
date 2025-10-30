import mongoose from "mongoose";

export const getData = async ({
    categories,
    commands,
    products,
    users,
    xTenant,
    tenantParam
}) => {
    // 1. Validação do Tenant


    if (!xTenant?.isValid) {
        return Response.json(
            { message: "Tenant ID inválido ou não autorizado" },
            { status: 403 }
        );
    }

    try {
        // Define o ID do tenant como ObjectId para o filtro
        const tenantObjectId = new mongoose.Types.ObjectId(xTenant.id);

        // 2. Cria as Promessas (Consultas)
        // As consultas são executadas sem 'await' para que Promise.all possa gerenciá-las.
        const categoriesPromise = categories
            .find({ tenant: tenantObjectId })
            .lean();

        const productsPromise = products
            .find({ tenant: tenantObjectId })
            .lean();

        const commandsPromise = commands
            .find({ tenant: tenantObjectId })
            .select({
                // Projeção para a lista mensal de comandas resumidas (como discutido)
                code: 1,
                userId: 1,
                payment: 1,
                createdAt: 1,
                'subOrders.product': 1,
                'subOrders.quantity': 1,
            })
            .lean();

        const usersPromise = users
            .find({ tenant: tenantObjectId })
            .lean();

        // 3. Executa todas as Promessas em paralelo
        const [
            categoriesData,
            productsData,
            commandsData,
            usersData
        ] = await Promise.all([
            categoriesPromise,
            productsPromise,
            commandsPromise,
            usersPromise
        ]);

        // 4. Retorno Otimizado (Payload de Catálogos)
        // Retorna todos os dados em um objeto estruturado, pronto para ser jogado no IndexedDB.
        if (commandsData.length > 0) {
            return Response.json(
                {
                    orders: commandsData,
                    catalog_products: productsData,
                    catalog_categories: categoriesData,
                    catalog_users: usersData,
                },
                { status: 200 }
            );
        }

        // Se nenhuma comanda foi encontrada, mas os catálogos vieram (Status 200 é melhor que 404)
        return Response.json(
            { 
                message: "Nenhuma comanda encontrada no período. Catálogos carregados.",
                orders: [],
                catalog_products: productsData,
                catalog_categories: categoriesData,
                catalog_users: usersData,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("MongoDB Query Error:", error);
        return Response.json(
            { message: "Erro ao processar os itens: falha na busca do banco de dados." },
            { status: 500 }
        );
    }
}        