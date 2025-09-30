"use client";
import { useEffect, useState } from "react";

import { Container } from "../../../components/layout/Container";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";
import { isEmpty } from "../../utils/empty";

export const ProdutoCadastrar = ({ productUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [error, setError] = useState(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const requests = [
          fetch(`/api/category`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ];

        if (productUUID !== "create") {
          requests.push(
            fetch(`/api/items?id=${productUUID}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
          );
        }

        const responses = await Promise.all(requests);
        const [categoriesRes, productRes] = responses;

        // categories
        const categoriesJSON = await categoriesRes.json();
        if (!isEmpty(categoriesJSON.records)) {
          setCategories(categoriesJSON.records);
        }

        // product (só existe se não for create)
        if (productRes) {
          const productJSON = await productRes.json();
          if (!isEmpty(productJSON.records)) {
            setProduct(productJSON.records);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productUUID]);

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Cadastrar Produto</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[50px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <FormComponent categories={categories} product={product} />
        </Content>
      </div>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
};
