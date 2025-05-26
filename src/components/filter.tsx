"use client";
import { FC, useState } from "react";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FilterOptions, Filters } from "@/commons/types";

type FilterProps = {
  filters: Filters;
  filterOptions: FilterOptions;
};

const Filter: FC<FilterProps> = ({ filters, filterOptions }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [newFilter, setNewFilter] = useState(filters);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterList = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilter).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.push(pathname + "?" + params.toString());

    setOpenFilter(false);
  };

  const cleanFilter = () => {
    router.push(pathname);
    setOpenFilter(false);
  };

  return (
    <Drawer.Root open={openFilter} onOpenChange={(e) => setOpenFilter(e.open)}>
      <Drawer.Trigger asChild>
        <Button colorPalette="teal" mb="4" variant="outline">
          Open Filter
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxWidth={500}>
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
                <Drawer.Title color="teal.700">Filter</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack
                  gap="8"
                  maxW="sm"
                  color="teal.700"
                  css={{ "--field-label-width": "150px" }}
                >
                  <Field.Root orientation="horizontal" colorPalette="teal">
                    <Field.Label>Filtered By Ingredient</Field.Label>
                    <Input
                      placeholder="...type"
                      flex="1"
                      value={newFilter.ingredient}
                      onChange={({ target: { value } }) => {
                        setNewFilter((prev) => ({
                          ...prev,
                          ingredient: value,
                        }));
                      }}
                    />
                  </Field.Root>

                  <Field.Root orientation="horizontal" colorPalette="teal">
                    <Field.Label>Filtered By Country</Field.Label>
                    <NativeSelect.Root width="240px">
                      <NativeSelect.Field
                        placeholder="Select option"
                        value={newFilter.area}
                        onChange={(e) => {
                          setNewFilter((prev) => ({
                            ...prev,
                            area: e.target.value,
                          }));
                        }}
                      >
                        {filterOptions.areaList?.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                  <Field.Root orientation="horizontal" colorPalette="teal">
                    <Field.Label>Filtered By Category</Field.Label>
                    <NativeSelect.Root width="240px">
                      <NativeSelect.Field
                        placeholder="Select option"
                        value={newFilter.category}
                        onChange={(e) => {
                          setNewFilter((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }));
                        }}
                      >
                        {filterOptions.categories?.map((c) => (
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
                  colorPalette="teal"
                  w={100}
                  variant="outline"
                  type="button"
                  onClick={() => {
                    cleanFilter();
                  }}
                >
                  Clean
                </Button>
                <Button colorPalette="teal" w={100} type="submit">
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
