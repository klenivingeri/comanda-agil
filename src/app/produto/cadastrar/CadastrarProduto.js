"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/useToast";
import { Container } from "../../../components/layout/Container";
import { Header, HeaderGrid } from "../../../components/layout/Header";
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
      <Header h="h-[30px]">
        <HeaderGrid>
          <div className="col-span-2" onClick={() => router.back()}>
            <IconBack size="h-[26px] w-[26px]" />
          </div>

          <div className="col-span-8 mt-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">CADASTRAR PRODUTO</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
        <Content isLoading={isLoading} error={error} margin="mt-[30px] mb-[50px]">
          <FormComponent categories={categories} product={product} />
        </Content>
    </Container>
  );
};
