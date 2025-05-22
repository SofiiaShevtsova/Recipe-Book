"use client";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import {
  Button,
  CloseButton,
  Drawer,
  Field,
  Input,
  NativeSelect,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { Meal } from "@/commons/types";
import { apiService } from "@/services/api-service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  setRecipeList: (list: Meal[]) => void;
  formData: {
    i?: string;
    a?: string;
    c?: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      i?: string;
      a?: string;
      c?: string;
    }>
  >;
};

const Filter: FC<FilterProps> = ({ setRecipeList, formData, setFormData }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [categoriesList, setCategoriesList] = useState<string[]>();
  const [areaList, setAreaList] = useState<string[]>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterList = () => {
    const filterString = Object.entries(formData).reduce((string, item) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(item[0], item[1]);
      router.push(pathname + "?" + params.toString());
      return `${string}${string.length ? "&" : ""}` + `${item[0]}=${item[1]}`;
    }, "");

    const getRecipe = async () => {
      const response = await fetch(`/api/recipe?${filterString}`);
      const data = await response.json();

      setRecipeList(data);
    };

    getRecipe();
    setOpenFilter(false);
  };

  const cleanFilter = () => {
    router.push(pathname);
    setOpenFilter(false);
    setFormData({});
  };

  useEffect(() => {
    apiService.getAllCategories().then((data) => {
      setCategoriesList(data);
    });
    apiService.getAllArea().then((data) => {
      setAreaList(data);
    });
  }, []);

  return (
    <Drawer.Root open={openFilter} onOpenChange={(e) => setOpenFilter(e.open)}>
      <Drawer.Trigger asChild>
        <Button mb="4" variant="outline" p="4">
          Open Filter
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content p="6" maxWidth={500}>
            <form
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleFilterList();
              }}
            >
              <Drawer.Header mt="10" mb="4">
                <Drawer.Title>Filter</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack
                  gap="8"
                  maxW="sm"
                  css={{ "--field-label-width": "150px" }}
                >
                  <Field.Root orientation="horizontal">
                    <Field.Label>Filtered By Ingredient</Field.Label>
                    <Input
                      placeholder="...type"
                      flex="1"
                      onChange={({ target: { value } }) => {
                        setFormData((prev) => ({ ...prev, i: value }));
                      }}
                    />
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Field.Label>Filtered By Country</Field.Label>
                    <NativeSelect.Root size="sm" width="240px">
                      <NativeSelect.Field
                        placeholder="Select option"
                        value={formData.a}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            a: e.target.value,
                          }));
                        }}
                      >
                        {areaList?.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                  <Field.Root orientation="horizontal">
                    <Field.Label>Filtered By Category</Field.Label>
                    <NativeSelect.Root size="sm" width="240px">
                      <NativeSelect.Field
                        placeholder="Select option"
                        value={formData.c}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            c: e.target.value,
                          }));
                        }}
                      >
                        {categoriesList?.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Stack>
              </Drawer.Body>
              <Drawer.Footer>
                <Button
                  w={100}
                  variant="outline"
                  type="button"
                  onClick={() => {
                    cleanFilter();
                  }}
                >
                  Clean
                </Button>
                <Button w={100} p="4" type="submit">
                  Save
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </form>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Filter;
