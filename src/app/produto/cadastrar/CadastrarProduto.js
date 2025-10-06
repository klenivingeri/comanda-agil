"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/useToast";
import { Container } from "../../../components/layout/Container";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";
import { isEmpty } from "../../utils/empty";
import { IconBack } from "public/icons/ArrowBack";

export const ProdutoCadastrar = ({ productUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        setIsLoading(false);
        toast.error("Ocorreu um erro ao cadastrar a categoria.");
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
          <div className="col-span-2 flex" onClick={() => router.back()}>
            <IconBack size="h-[32px] w-[32px]" />
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
    </Container>
  );
};
