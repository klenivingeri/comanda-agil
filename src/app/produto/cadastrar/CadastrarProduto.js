"use client";
import { useEffect, useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { Container } from "../../../components/layout/Container";
import { Header } from "../../../components/layout/Header";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";
import { isEmpty } from "../../utils/empty";

export const ProdutoCadastrar = ({ productUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
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
      <Header divider title="Cadastro de produto" />
        <Content isLoading={isLoading} error={error}>
          <FormComponent categories={categories} product={product} />
        </Content>
    </Container>
  );
};
